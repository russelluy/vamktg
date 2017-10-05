define(['angular'], function (angular) {
  'use strict';

  var SeatSelectorCtrl = function (
    $scope,
    fareService,
    resourceBundle,
    seatService,
    $q
  ) {
    $scope.seatSelector = $scope.seatSelector || {};

    // Legs - one way, return, multi-city...
    $scope.legs = [];

    // Controller container for selected seats.
    $scope.seatSelector.selectedSeats = {};

    // Attach resource bundle
    $scope.resourceBundle = resourceBundle;

    this.initialize = this.initialize || angular.noop;

    this.onLegsChange = this.onLegsChange || function (legs) {
      if (legs && legs.length) {
        $scope.legs = legs;

        // Get cabin availability for first segment
        this._verifyCabinAvailability(0);

        // If the passed in value is an empty array,
        // Let's make sure that we reset the section.
        if (legs.length === 0) {
          // Clear all the selected seats if any selected.
          $scope.seatSelector.selectedSeats = {};
        }
      }
    };

    this.isInventoryLocked = function () {
      return fareService.getInventoryLocked();
    };

    /**
     * Checking if the key is the last one in the specified
     * object.
     * @param String key - property name.
     * @param {Object} object - Object with properties to be searched.
     * @return {boolean}
     */
    this.isLast = this.isLast || function (key, object) {

      var isLast = false;

      if (key && object) {
        var keys = Object.keys(object);
        isLast = keys.indexOf(key) === keys.length - 1;
      }
      return isLast;
    };

    /**
     * Hide the seat selector.
     */
    this.hide = function () {
      $scope.visible  = false;
    };

    /**
     * Show the seat selector.
     */
    this.show = function () {
      $scope.visible = true;
    };

    this.hasAvatarAssigned = this.hasAvatarAssigned || function (seat) {
      return (seat.selected === true) ? true : false;
    };

    /**
     * Resolves the alteration label for tier alteration.
     *
     * @param {number} cost
     * @param {number} index
     * @return {string}
     */
    this.alterationLabel = this.alterationLabel || function (cost, index) {
      var fare = fareService.getSegmentByIndex(index);

      var alterationString = '';

      if (fare && fare.cost) {

        var currency = fare.cost.points === null ? 'dollars' : 'points';

        var isRefundable = fare.tier.indexOf('Refundable') !== -1 ||
          fare.tier.indexOf('Upgrade') !== -1;

        var currencyIdentifier = fare.cost.points === null ? 'dollarFare' : 'pointsFare';
        var currencyProperty = fare.cost.points === null ? 'totalFare' : 'totalPoints';

        var tempBaseName = fare.tier.replace('Refundable', '').replace('Upgrade', '');
        var baseName = fare.tier;

        if (isRefundable) {
          if (typeof fare.tiers[tempBaseName][currencyIdentifier] !== 'undefined') {
            baseName = fare.tier.replace('Refundable', '').replace('Upgrade', '');
          }
        }

        var fareCost =  !isRefundable ? fare.cost[currency].total :
          fare.tiers[baseName][currencyIdentifier][currencyProperty];

        alterationString = cost > fareCost ?
          resourceBundle.seatMap.UPGRADE :
          (cost < fareCost ?
            resourceBundle.seatMap.DOWNGRADE : '');

      }
      return alterationString;
    };

    /**
     * Converts cabin name into compatible format for fareInfo modal
     * and opens modal
     * @param {string} cabinName Name of cabin class
     */
    this.openFareInfoModal = this.openFareInfoModal || function (cabinName) {
      cabinName = (cabinName === 'MC') ? 'MAIN' : cabinName;
      //this.$scope.trip.openFareInfoModal(cabinName.toLowerCase());
    };

    /**
     * Calculates the cost of the tier alteration and formats the output.
     *
     * @param {number} cost
     * @param {number} index
     * @return {string}
     */
    this.alterationCost = this.alterationCost || function (cost, index) {
      var fare = fareService.getSegmentByIndex(index);

      var alterationString = '';
      var alterationValue = 0;

      if (fare && fare.cost) {

        var currency = fare.cost.points === null ? 'dollars' : 'points';
        var currencyCode = fare.cost.points === null ? '$' : '';

        var currencyIdentifier = fare.cost.points === null ? 'dollarFare' : 'pointsFare';
        var currencyProperty = fare.cost.points === null ? 'totalFare' : 'totalPoints';

        var isRefundable = fare.tier.indexOf('Refundable') !== -1 ||
          fare.tier.indexOf('Upgrade') !== -1;

        var tempBaseName = fare.tier.replace('Refundable', '').replace('Upgrade', '');
        var baseName = fare.tier;

        if (isRefundable) {
          if (typeof fare.tiers[tempBaseName][currencyIdentifier] !== 'undefined') {
            baseName = fare.tier.replace('Refundable', '').replace('Upgrade', '');
          }
        }

        var fareCost =  !isRefundable ? fare.cost[currency].total :
          fare.tiers[baseName][currencyIdentifier][currencyProperty];

        alterationValue = cost - fareCost;
        var quantifier = alterationValue > 0 ? '+' : '-';

        alterationString = quantifier + currencyCode + Math.abs(alterationValue);
      }

      return alterationValue === 0 ? '' : alterationString;
    };

    /**
     * Evaluates whether current seatmap segment should be visible
     */
    this.isVisibleSection = this.isVisibleSection || function (stepIndex) {
      return stepIndex <= $scope.seatSelector.currentIndex;
    };

    this.getMapTitleForSegment = this.getMapTitleForSegment || function (segmentIndex) {
      var label = resourceBundle.flightInformation.leg.name[
        fareService.getFlightIndexBySegment(segmentIndex)
      ];
      var segment = fareService.getSegmentByIndex(segmentIndex);

      return [label, ' | ', segment.departure, ' - ', segment.arrival].join('');
    };

    /**
     * AngularJS + Objects as pseudo arrays = reordering.
     * We need to keep the order of rows.
     * @param {Object} object
     * @return []
     */
    this.notSorted = this.notSorted || function (object) {
      return !object ? [] : Object.keys(object);
    };

    /**
     * Verify that a seat doesn't require some form of confirmation via modal before
     * the seat selection is applied. For example, understanding a seat is
     * non-recline, an exit row or upgrading between tiers.
     *
     * @param {object} seat An object that represents a seat
     * @returns {object} A $q promise.
     */
    this._verifySeat = this._verifySeat || function (seat, segmentIndex) {
      var deferred = $q.defer();
      var verifyIssues = {};
      var requiresAcceptance = false;
      var modalScope;
      var newCabin;

      var cabinTypes = {
        main: 'Main Cabin',
        mcs: 'Main Cabin Select'
      };

      /*
        Object representing seat types that need to be explained to user.
        Changing seat tier and Exit Row both need to be accepted in modal.
      */
      var seatTypes = {
        nonRecline: true,
        exitRow: {
          accept: true
        }
      };

      var shouldUpgradeFare = this._shouldUpgradeFare(seat, segmentIndex);
      var shouldDowngradeFare = this._shouldDowngradeFare(seat, segmentIndex);

      if (shouldUpgradeFare.valid) {
        seatTypes.upgradeFare = { accept: true };
      }

      if (shouldDowngradeFare.valid) {
        seatTypes.downgradeFare = { accept: true };
        newCabin = cabinTypes[shouldDowngradeFare.cabin];
      }

      angular.forEach(seatTypes, function (typeObj, key) {
        if (angular.isDefined(seat[key]) && seat[key] === true ||
            key === 'upgradeFare' || key === 'downgradeFare') {
          verifyIssues[key] = true;
          requiresAcceptance =
            (typeObj.accept || key === 'upgradeFare' ||
              key === 'downgradeFare') ? true : requiresAcceptance;
        }
      });

      // Do we have issues that require a modal?
      if (Object.size(verifyIssues) > 0) {

        // Create new scope and attach verification data
        modalScope = this.$scope.$new();
        modalScope.verify = verifyIssues;
        modalScope.verify.requiresAcceptance = requiresAcceptance;

        if (shouldDowngradeFare.valid) {
          modalScope.verify.newCabin = newCabin;
        }

        // Create pointer to modal resource in bundle
        var modalResource = this.resourceBundle.modal.seatChangeAccept;

        // Open modal instance
        this.$modal.open({
          controller: ['$scope', function ($scope) {
            $scope.accept = function () {
              deferred.resolve({
                changeTier: this.$parent.verify.upgradeFare ||
                  this.$parent.verify.downgradeFare
              });
              this.$parent.$close('accepted');
            };
          }],
          size: modalResource.SIZE,
          scope: modalScope,
          title: modalResource.TITLE,
          templateUrl: modalResource.TEMPLATE_URL
        })
        // If modal is closed, reject promise
        .result.then(null, function () {
          deferred.reject();
        });
      }

      // If no issues
      !requiresAcceptance && deferred.resolve();

      return deferred.promise;
    };

    this._verifyCabinAvailability = this._verifyCabinAvailability || function (segment) {
      var selectedFares = fareService.getSelectedFares();
      var index = fareService.getFlightIndexBySegment(segment);
      var segmentTier = selectedFares[index].tier;
      $scope.legs[index].seatSelectionAvailable =
      $scope.legs[index].cabinAvailability[segmentTier];
    };

    // Watch for the legs change
    // since that change means that the api
    // call for the seat map has been fired.
    $scope.$watch(
      seatService.getLegs,
      this.onLegsChange.bind(this)
    );

    /* Extend $scope seatSelector object */
    angular.extend($scope.seatSelector, {
      alterationLabel: this.alterationLabel,

      alterationCost: this.alterationCost,

      currentIndex: 0,

      isVisibleSection: this.isVisibleSection,

      notSorted: this.notSorted,

      getMapTitleForSegment: this.getMapTitleForSegment,

      isLast: this.isLast,

      isInventoryLocked: this.isInventoryLocked,

      openFareInfoModal: this.openFareInfoModal,

      hasAvatarAssigned: this.hasAvatarAssigned.bind(this)
    });

    this.initialize();
  };

  return SeatSelectorCtrl;
});