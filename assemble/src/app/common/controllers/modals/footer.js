define(function () {
  'use strict';

  var FooterModalCtrl = function (
    $scope,
    SiteMapBundle
  ) {

    $scope.footer = {
      links: SiteMapBundle.siteMap.footer
    };

  };

  // Injected dependencies
  FooterModalCtrl.$inject = [
    '$scope',
    'SiteMapBundle'
  ];

  return FooterModalCtrl;
});