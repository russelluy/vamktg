define(['angular'], function (angular) {
  'use strict';

  var EntertainmentCtrl = function (
    $scope
  ) {

    this._$scope = $scope;

    this._$scope.entertainment = {
      category: 0,
      changeCategory: this.changeCategory.bind(this),
      items: [],
      template: 'standard'
    };

    // init
    this.changeCategory(0);
  };

  // Injected dependencies
  EntertainmentCtrl.$inject = [
    '$scope'
  ];

  EntertainmentCtrl.prototype.changeCategory = function (newCat) {

    var ent = this._$scope.accordion.content;
    if (ent) {
      // loop through entertainment categories
      for (var cat = 0; cat < ent.length; cat++) {
        if (ent[cat].id === newCat) {
          // update entertainment model
          angular.extend(
            this._$scope.entertainment,
            {
              items: ent[cat].items,
              template: ent[cat].template
            }
          );
        }
      }
    }
  };

  return EntertainmentCtrl;
});
