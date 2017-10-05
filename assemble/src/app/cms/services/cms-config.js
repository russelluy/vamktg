/*global angular:false */

define(function () {
  'use strict';

  var cmsConfigSubService = function cmsConfigSubService($http, cmsCache) {
    return {
      get: function (cb) {
        return $http.get('/cms/config.json', {
          cache: cmsCache
        }).then(function (res) {

          var geoHeader = res.headers('Geo_Info') ||
                        'City=SANFRANCISCO;State=CA;MSA=7362';
          res.data.geoData = {};
          angular.forEach(geoHeader.split(';'), function (component) {
            var parts = component.split('=');
            res.data.geoData[parts[0]] = parts[1];
          });

          cb(res.data);
        });
      }
    };
  };

  return cmsConfigSubService;
});
