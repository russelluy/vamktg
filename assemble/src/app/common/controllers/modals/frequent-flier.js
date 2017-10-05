define(['angular'], function (angular) {
  'use strict';

  var FrequentFlierCtrl = function (
    $parse,
    $scope,
    $modalInstance,
    $q,
    pnrService,
    windowService
  ) {
    var self = this;

    this._$scope = $scope;
    this._$modalInstance = $modalInstance;
    this._$q = $q;
    this._pnrService = pnrService;
    this._windowService = windowService;

    this._$scope.frequentFlier = {
      fields: {},
      save: this.save.bind(this),
      onSave: $parse('save')($scope),
      changeTraveler: this.changeTraveler.bind(this),
      ninjaMode: windowService.ninjaMode()
    };

    this._$scope.programs = this._pnrService.getFFPrograms();

    var travelers = [this._$scope.traveler];

    this._$scope.travelers = [];

    angular.forEach(travelers, function (traveler) {
      var travelerObj = {
        name: traveler.firstName + ' ' + traveler.lastName,
        ff: {
          name: (traveler.loyaltyProgramName) ? traveler.loyaltyProgramName : '',
          number: (traveler.loyaltyId) ? traveler.loyaltyId : ''
        }
      };

      self._$scope.travelers.push(travelerObj);
    });

    // init traveler select box
    this._$scope.currentTraveler = this._$scope.travelers[0];
  };

  // Injected dependencies
  FrequentFlierCtrl.$inject = [
    '$parse',
    '$scope',
    '$modalInstance',
    '$q',
    'pnrService',
    'windowService'
  ];

  FrequentFlierCtrl.prototype.changeTraveler = function () {
    // switch between travelers
  };

  FrequentFlierCtrl.prototype.save = function () {

    var self = this;

    this._$scope.tripKey = this._$scope.tripKey ? this._$scope.tripKey : 0;
    this._$scope.paxListIndex = this._$scope.paxListIndex ?
      this._$scope.paxListIndex : 0;

    var pnr = this._pnrService.model()[this._$scope.tripKey].pnr;
    var number = this._$scope.frequentFlier.fields.ffn.value;
    var airline = this._$scope.frequentFlier.fields.ffname.value.value;
    var nameParts = this._$scope.currentTraveler.name.split(' ');
    var firstName = nameParts[0];
    delete nameParts[0];
    var lastName = nameParts.join(' ');

    this._pnrService.attachElevate(
      firstName,
      lastName,
      airline,
      number,
      pnr
    ).then(function (success) {
        if (success) {
          self._pnrService.model()[self._$scope.tripKey]
            .paxList[self._$scope.paxListIndex]
            .loyaltyId = number;
        }
      });

    this._$modalInstance.close();
  };

  return FrequentFlierCtrl;
});