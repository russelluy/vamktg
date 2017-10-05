define([], function () {
  'use strict';

  var SiteMapCtrl = function (
    $scope,
    SiteMapBundle
  ) {
    this._$scope = $scope;

    $scope.siteMap = SiteMapBundle.siteMap.all;
  };

  // Injected dependencies
  SiteMapCtrl.$inject = [
    '$scope',
    'SiteMapBundle'
  ];

  return SiteMapCtrl;
});
