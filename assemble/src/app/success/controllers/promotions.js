define(function () {
  'use strict';

  var PromotionsCtrl = function (
    $scope,
    cms
  ) {

    this._$scope = $scope;

    // Get latest news from CMS flightInfo, attach to scope
    cms.flightInfo.get(function (res) {
      $scope.promotions = {
        flyingWithUs: res.flyingWithUs,
        onboardEntertainment: res.entertainment,
        foodAndDrink: res.foodDrinks
      };
    });
  };

  // Injected dependencies
  PromotionsCtrl.$inject = [
    '$scope',
    'cms'
  ];

  return PromotionsCtrl;
});