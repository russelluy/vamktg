define(function () {
  'use strict';

  var EmailItineraryCtrl = function (
    $scope,
    $modalInstance,
    manageService
  ) {

    this._$scope = $scope;
    this._$modalInstance = $modalInstance;
    this._manageService = manageService;

    this._$scope.emailItinerary = {
      fields: {},
      sendEmails: this.sendEmails.bind(this)
    };

  };

  // Injected dependencies
  EmailItineraryCtrl.$inject = [
    '$scope',
    '$modalInstance',
    'manageService'
  ];

  EmailItineraryCtrl.prototype.sendEmails = function () {

    var emails = this._$scope.emailItinerary.fields.emailList.value;

    this._manageService.emailItinerary(emails);

    this._$modalInstance.close();
  };

  return EmailItineraryCtrl;
});