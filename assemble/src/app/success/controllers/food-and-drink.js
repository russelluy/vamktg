define(['angular'], function (angular) {
  'use strict';

  var FoodAndDrinkCtrl = function (
    $scope
  ) {

    this._$scope = $scope;

    this._$scope.food = {
      allFlights: [],
      longHaul: [],
      category: 0,
      changeCategory: this.changeCategory.bind(this),
      template: 'standard'
    };

    // init
    this.changeCategory(0);
  };

  // Injected dependencies
  FoodAndDrinkCtrl.$inject = [
    '$scope'
  ];

  FoodAndDrinkCtrl.prototype.changeCategory = function (newCat) {
    var fd = this._$scope.accordion.content;
    var allFlightsTemp = [];
    var longHaulTemp = [];

    // loop through food categories
    for (var cat = 0; cat < fd.length; cat++) {
      if (fd[cat].id === newCat) {

        // loop through meals and add to relevant temp array
        for (var meals = 0; meals < fd[cat].items.length; meals++) {
          if (fd[cat].items[meals].availableOnLongerThan2H) {
            allFlightsTemp.push(fd[cat].items[meals]);
          } else {
            longHaulTemp.push(fd[cat].items[meals]);
          }
        }

        // update food model
        angular.extend(
          this._$scope.food,
          {
            allFlights: allFlightsTemp,
            longHaul: longHaulTemp,
            template: fd[cat].template
          }
        );
      }
    }
  };

  return FoodAndDrinkCtrl;
});