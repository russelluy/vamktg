define([], function () {
  'use strict';
  var DealsCtrl = function (
    $scope,
    cmsService
  ) {
    var _$scope = $scope;
    _$scope.selectedOption = "";
    cmsService.getDefaultAirport().then(
      function (DefaultAirport) {
        $("#dealsCombo option").each(function() {
          if($(this).attr('airport') === DefaultAirport){
            _$scope.selectedOption = $(this).val();
          }
        });
      }
    );
  };
  // Injected dependencies
  DealsCtrl.$inject = [
    '$scope',
    'cms'
  ];
  return DealsCtrl;
});
