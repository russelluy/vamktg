define(function () {
  'use strict';

  var KnownTravelerCtrl = function (
    $scope,
    $modalInstance,
    manageService
  ) {

    this._$scope = $scope;
    this._$modalInstance = $modalInstance;
    this._manageService = manageService;

    this._$scope.knownTraveler = {
      fields: {},
      save: this.save.bind(this),
      changeTraveler: this.changeTraveler.bind(this)
    };

    this._$scope.travelers = this._manageService.getTravelers();

    // init traveler select box
    this._$scope.currentTraveler = this._$scope.travelers[0];

  };

  // Injected dependencies
  KnownTravelerCtrl.$inject = [
    '$scope',
    '$modalInstance',
    'manageService'
  ];

  KnownTravelerCtrl.prototype.changeTraveler = function (currentTraveler) {
    this._$scope.currentTraveler = currentTraveler;
  };

  KnownTravelerCtrl.prototype.save = function () {

    var fullName = this._$scope.currentTraveler.name;

    var number = this._$scope.knownTraveler.fields.ktn.value;

    this._manageService.addKnownTravelerNumber(fullName, number);

    this._$modalInstance.close();
  };

  return KnownTravelerCtrl;
});