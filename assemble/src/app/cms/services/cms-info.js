define(function () {
  'use strict';

  var cmsInfoSubService = function cmsInfoSubService($http, cmsCache) {
    return {
      get: function (cb) {
        return $http.get('/cms/info.json', {
          cache: cmsCache
        }).then(function (res) {
          cb(res.data);
        });
      }
    };
  };

  return cmsInfoSubService;
});