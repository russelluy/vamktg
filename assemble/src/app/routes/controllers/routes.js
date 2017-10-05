define(['angular'], function (angular) {
  'use strict';

  var RoutesCtrl = function (
    $scope,
    windowService,
    RoutesBundle
  ) {

    this._$scope = $scope;
    this._windowService = windowService;

    this._$scope.routes = {
      breakpoint: '',
      data: RoutesBundle
    };

    $scope.$watch(
      this._windowService.breakpoint,
      this.onBreakpointChange.bind(this)
    );
  };

  // Injected dependencies
  RoutesCtrl.$inject = [
    '$scope',
    'windowService',
    'RoutesBundle'
  ];

  RoutesCtrl.prototype.onBreakpointChange = function (newBreakpoint) {
    this._$scope.routes.breakpoint = newBreakpoint;
  };

  return RoutesCtrl;
});
