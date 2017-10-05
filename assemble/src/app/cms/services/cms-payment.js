define(function () {
  'use strict';

  var cmsPaymentSubService = function cmsPaymentSubService($http, cmsCache) {
    return {
      get: function (cb) {
        return $http.get('/cms/payment.json', {
          cache: cmsCache
        }).then(function (res) {
          cb(res.data);
        });
      }
    };
  };

  return cmsPaymentSubService;
});