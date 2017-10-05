define(function () {
  'use strict';

  var ForgotPasswordCtrl = function ($scope, elevateService) {
    this._$scope = $scope;
    this._elevateService = elevateService;

    $scope.forgot = {
      fields: {},
      submit: this._submit.bind(this)
    };
  };

  ForgotPasswordCtrl.$inject = ['$scope', 'elevateService'];

  ForgotPasswordCtrl.prototype._submit = function () {
    var email = this._$scope.forgot.fields.email.value;
    var promise = this._elevateService.forgotPassword(email);
    promise.then(this._onSuccess.bind(this), this._onError.bind(this));

    return promise;
  };

  ForgotPasswordCtrl.prototype._onSuccess = function () {
    this._$scope.forgot.email = this._$scope.forgot.fields.email.value;
  };

  ForgotPasswordCtrl.prototype._onError = function (res) {
    // TODO: show error message
    console.log(res);
  };

  return ForgotPasswordCtrl;
});