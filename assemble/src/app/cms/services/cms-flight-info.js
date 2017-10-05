define(function () {
  'use strict';

  var cmsFlightInfoSubService = function cmsFlightInfoSubService($http, cmsCache) {
    return {
      get: function (cb) {
        return $http.get('/cms/flight_info.json', {
          cache: cmsCache
        }).then(function (res) {
          cb(res.data);
        });
      }
    };
  };

  return cmsFlightInfoSubService;
});