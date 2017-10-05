/**
 * Manages the persistence layer
 *
 * @class core/services/PersistenceService
 *
 */
define(
[
  'angular',
  'common/models/elevate-model',
  'common/models/trip-model'
],
function (
  angular,
  ElevateModel,
  TripModel
) {
  'use strict';

  var PersistenceService = function ($q, $http) {
    this._$q = $q;
    this._$http = $http;
    this._isLoaded = false;
    this._publicModel = null;
    this._privateModel = null;

    return {
      isLoggedIn: this.isLoggedIn.bind(this),
      getUserData: this.getUserData.bind(this),
      retrieve: this.retrieve.bind(this),
      isLoaded: this.isLoaded.bind(this),
      doLogout: this.doLogout.bind(this)
    };
  };

  PersistenceService.$inject = ['$q', '$http'];

  PersistenceService.prototype.retrieve = function () {
    var deferred = this._$q.defer();
    var _publicModel = {};
    var _privateModel = {};

    this._$http.get('/api/v0/cart/retrieve').then(function (res) {
      if (res.status === 200) {
        if (res.data.public) {
          this._publicModel = res.data.public;
          this._privateModel = res.data.protected;
        } else {
          this._publicModel = {};
          this._privateModel = {};
        }
        deferred.resolve(_publicModel);
      }
      this._isLoaded = true;
    }.bind(this));

    return deferred.promise;
  };

  PersistenceService.prototype.isLoggedIn = function () {
    var _return = false;
    if (
      this._publicModel &&
      this._publicModel.elevate &&
      this._publicModel.elevate.elevateId &&
      this._privateModel
      //retrieve don't have authToken when it is away
      //&& this._privateModel.authToken
      ) {
      _return = true;
    }
    return _return;
  };

  PersistenceService.prototype.getUserData = function () {
    return (this._publicModel)?this._publicModel.elevate:{};
  };

  PersistenceService.prototype.isLoaded = function () {
    return this._isLoaded;
  };

  PersistenceService.prototype.doLogout = function () {
    var deferred = this._$q.defer();
    this._publicModel = {};
    this._privateModel = {};
    var cleaner = {public: this._publicModel, protected: this._privateModel};
    this._$http.put('/api/v0/cart/update', cleaner).then(function () {
      var req = {logOut: true};
      this._$http.post('/api/v0/elevate/logout', req).then(function () {
        deferred.resolve();
      }.bind(this));
    }.bind(this));
    return deferred.promise;
  };

  return PersistenceService;
});
