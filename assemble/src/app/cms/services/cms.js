define([
  'cms/services/cms-config',
  'cms/services/cms-flight-info',
  'cms/services/cms-payment',
  'cms/services/cms-info'
], function (
  cmsConfigSubService,
  cmsFlightInfoSubService,
  cmsPaymentSubService,
  cmsInfoSubService
) {
  'use strict';

  var CmsService = function CmsService($q, CMS, $http, $cacheFactory) {
    this.$q = $q;

    var subServicesList;
    this._services = {};

    var cmsCache = $cacheFactory('cmsCache');

    subServicesList = {
      config: cmsConfigSubService,
      flightInfo: cmsFlightInfoSubService,
      payment: cmsPaymentSubService,
      info: cmsInfoSubService
    };

    for (var key in subServicesList) {
      var subService = subServicesList[key];
      this._services[key] = subService($http, cmsCache);
    }

    this._services.getAirportNames = this.getAirportNames.bind(this);
    this._services.getDefaultAirport = this.getDefaultAirport.bind(this);

    // Return Api service, aggregating sub-services
    return this._services;
  };

  /**
   * Copy from the trip service
   **/
  CmsService.prototype.getDefaultAirport = function () {
    var deferred = this.$q.defer();
    this._services.config.get(function (res) {
      var out;
      // Looking for default airport based on gelocation
      angular.forEach(res.airports, function (airportObj, airportCode) {
        if (res.geoData && res.geoData.MSA && airportObj.msaCode === res.geoData.MSA) {
          out = airportCode;
        }
      });
      // If not found, default to state ones
      if (!out) {
        angular.forEach(res.airports, function (airportObj, airportCode) {
          if (
            res.geoData &&
            res.geoData.State &&
            airportObj.state === res.geoData.State &&
            airportObj.mainInState
          ) {
            out = airportCode;
          }
        });
      }
      // If not found, default to VX's main hub: SFO
      if (!out) { out = 'SFO'; }
      deferred.resolve(out);
    });
    return deferred.promise;
  };


  /**
   * Pass in one of more airport codes, and get a string
   *  or object of airport name strings back.
   * @param {Object|string} airportCodes An array of airport codes
   *  or string of a single airport code.
   * @return {Object|string} An object with airport codes as keys and
   *  airport names as values, or an airport name string if passed
   *  a single airport code string as a parameter.
   */
  CmsService.prototype.getAirportNames = function (airportCodes) {
    var deferred = this.$q.defer();
    var airportNamesObj = {};
    var isSingle;
    var airportName;
    var code, ref;

    if (typeof airportCodes === 'string') {
      airportCodes = [airportCodes];
      isSingle = true;
    }

    this._services.config.get(function (config) {
      for (var idx in airportCodes) {
        code = airportCodes[idx];
        ref = config.airports[code];
        if (ref) {
          if (isSingle) {
            airportName = ref.name;
          } else {
            airportNamesObj[code] = ref.name;
          }
        }
      }

      deferred.resolve(
        (isSingle) ? airportName : airportNamesObj
      );
    });

    return deferred.promise;
  };

  CmsService.$inject = [
    '$q',
    'CMS',
    '$http',
    '$cacheFactory',
  ];

  return CmsService;
});