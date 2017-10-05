define(function () {
  'use strict';

  var WrongEmailCtrl = function (
    $scope,
    $parse,
    $modalInstance,
    manageService
  ) {

    this._$scope = $scope;
    this._$modalInstance = $modalInstance;
    this._manageService = manageService;

    this._$scope.wrongEmail = {
      currentEmail: $parse('currentEmail')($scope),
      fields: {},
      sendEmail: this.sendEmail.bind(this)
    };

  };

  // Injected dependencies
  WrongEmailCtrl.$inject = [
    '$scope',
    '$parse',
    '$modalInstance',
    'manageService'
  ];

  WrongEmailCtrl.prototype.sendEmail = function () {

    var emails = this._$scope.wrongEmail.fields.email.value;

    this._manageService.emailItinerary(emails);

    this._$modalInstance.close();
  };

  return WrongEmailCtrl;
});