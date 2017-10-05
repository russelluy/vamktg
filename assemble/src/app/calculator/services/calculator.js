define(function () {
  'use strict';

  var CalculatorService = function CalculatorService($http, $cacheFactory) {
    var cmsCache = $cacheFactory('cmsCache');
    return {
      getJson: function (json_file, cb) {
        if (json_file !== '') {
          return $http.get(json_file, {
              cache: cmsCache
            }).then(function (res) {
            cb(res.data);
          });
        }
      }
    };
  };

  CalculatorService.$inject = [
    '$http',
    '$cacheFactory'
  ];

  return CalculatorService;
});
