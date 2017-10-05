define(['angular', 'jquery'], function (angular, $) {
  'use strict';

  var RoutesCollectionDirective = function () {
    return {
      restrict: 'A',
      replace: true,
      scope: {
        cities: '@',
        layout: '@',
        isFirst: '@',
        isLast: '@'
      },
      controller: RoutesCollectionCtrl,
      link: RoutesCollectionLinkFn,
      templateUrl: '/app/routes/directives/routes-collection.tpl.html'
    };
  };

  var RoutesCollectionCtrl = function (
    $scope,
    $http,
    windowService,
    RoutesBundle
  ) {

    this._$scope = $scope;
    this._windowService = windowService;
    this._routesBundle = RoutesBundle;

    $scope.routesCollection = {
      data: [],
      expandRoute: this.expandRoute.bind(this),
      closeExpanded: this.closeExpanded.bind(this)
    };

    $scope.expanded = null;

    // get route data
    $scope.routesCollection.data = this.getRoutesData();

    // add additional info to model for styling
    if ($scope.layout === 'is-sm-single' || $scope.layout === 'is-md-block-left') {
      angular.extend(
        $scope.routesCollection.data[0],
        {
          isLarge: true,
          isNoBorder: true
        }
      );
    } else if ($scope.layout === 'is-sm-double' || $scope.layout === 'is-md-row') {
      $scope.routesCollection.data[0].isNoBorder = true;
    } else if ($scope.layout === 'is-md-block-right') {
      $scope.routesCollection.data[0].isNoBorder = true;
      $scope.routesCollection.data[3].isNoBorder = true;

      angular.extend(
        $scope.routesCollection.data[2],
        {
          isLarge: true,
          isFloatRight: true
        }
      );
    //"last" layout blocks may contain a placeholder, define it here if there is one.
    } else if ($scope.layout === 'is-md-block-right-last') {
      $scope.routesCollection.data[0].isNoBorder = true;
      $scope.routesCollection.data[3].isNoBorder = true;

      angular.extend(
        $scope.routesCollection.data[2],
        {
          isLarge: true,
          isFloatRight: true
        }
      );
      //assign placeholder image
      $scope.routesCollection.data[3].isPlaceholder = true;
    
    } else if ($scope.layout === 'is-sm-double-last') {
      $scope.routesCollection.data[0].isPlaceholder = true;
      $scope.routesCollection.data[0].isNoBorder = true;
    }
    // TODO: this should be a call to the actual api, not the stub
    // get config data for destination mapping
    $http({method: 'GET', url: '/cms/config.json'}).
      success(function(data) {
        // this callback will be called asynchronously
        // when the response is available
        this._airportMapping = data.airportMapping;
        this._airports = data.airports;
      }.bind(this)).
      error(function() {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log('no config');
      });
  };

  RoutesCollectionCtrl.$inject = [
    '$scope',
    '$http',
    'windowService',
    'RoutesBundle'
  ];

  RoutesCollectionCtrl.prototype.getRoutesData = function () {
    var data = [];

    // convert injected cities to array
    var routesArray = this._$scope.cities.split(',');

    angular.forEach(routesArray, function (route) {
      data.push(this._routesBundle[route]);
    }.bind(this));

    return data;
  };

  RoutesCollectionCtrl.prototype.expandRoute = function (route) {
    var connectingCities = [];

    // get connections from cms config
    var connections = [];
    for (var key in this._airportMapping[route.airportCode].to) {
      connections.push(key);
    }

    // pouplate array of connecting cities
    angular.forEach(connections, function (connection) {
      if (this._routesBundle[connection]) {
        connectingCities.push(this._routesBundle[connection]);
      } else {
        // fix for non existing connections on routes bundle
        var _airport = this._airports[connection];
        var newConnection = {
          airportCode: connection,
          cityName: _airport.name,
          cityState: _airport.state + ' ('+ connection +')',
          imgSrc: ""
        };
        connectingCities.push(newConnection);
      }
    }.bind(this));

    this._$scope.expanded = {
      airportCode: route.airportCode,
      imgSrc: route.imgSrc,
      cityName: route.cityName,
      cityState: route.cityState,
      connectingCities: connectingCities
    };

    // scroll
    var $el = $(this._$scope.iElem);
    var scrollTop = $el.offset().top + $el.height();
    var offset = (this._windowService.breakpoint() === 'small') ? 0 : -60;
    $('body, html').animate({
      scrollTop: scrollTop + offset
    }, 300);
  };

  RoutesCollectionCtrl.prototype.closeExpanded = function () {
    this._$scope.expanded = null;
  };

  var RoutesCollectionLinkFn = function (scope, iElem) {
    scope.iElem = iElem;
  };

  return RoutesCollectionDirective;
});