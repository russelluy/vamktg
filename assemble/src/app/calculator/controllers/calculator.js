define(['jquery'],function ($) {
  'use strict';
  var CalculatorCtrl = function ($scope, calculatorService, $timeout) {
    this._$scope = $scope;
    this._$timeout = $timeout;
    this._calculatorService = calculatorService;
    this._$scope.calculator = {
      requiresConnection: false,
      firstLoad: true,
      defaultOrigin: '',
      defaultDestination: '',
      json_airports: '',
      json_pointsBurnAll: '',
      json_carriers: '',
      mainOrigin: {value:''},
      mainDestination: {value:''},
      data: {},
      originSelected: '',
      destinationSelected: '',
      carrierSelected: '',
      typeSelected: 'RT',
      airports_origin: [],
      airports_destination: [],
      carriers: {},
      result: []
    };

    this._$scope.$watch('calculator.originSelected', this._filterAirports.bind(this));
    this._$scope.$watch('calculator.destinationSelected', this._execCalc.bind(this));
    this._$scope.$watch('calculator.typeSelected', this._execCalc.bind(this));

    this._$scope.$watch('calculator.json_carriers', this.calcInit.bind(this));
    console.log('testando');

  };

  // Injected dependencies
  CalculatorCtrl.$inject = ['$scope', 'calculatorService', '$timeout'];


  CalculatorCtrl.prototype.calcInit = function () {
        console.log(this._$scope.calculator.json_carriers);
    var calculatorService = this._calculatorService;
    calculatorService.getJson( this._$scope.calculator.json_carriers, function (data) {
      for ( var x in data.carriersData){
        this._$scope.calculator.carriers[data.carriersData[x].value] = data.carriersData[x].name;
      }
      calculatorService.getJson(this._$scope.calculator.json_airports,function (data) {
        for ( var airport in data.airportsData){
          if (data.airportsData[airport].value === this._$scope.calculator.defaultOrigin) {
            this._$scope.calculator.mainOrigin = data.airportsData[airport];
          }
          if (data.airportsData[airport].value === this._$scope.calculator.defaultDestination) {
            this._$scope.calculator.mainDestination = data.airportsData[airport];
          }
          this._$scope.calculator.airports_origin.push( data.airportsData[airport] );
        }
        calculatorService.getJson(this._$scope.calculator.json_pointsBurnAll,function (data) {
          this._$scope.calculator.data = data.flightData;
          // allowing only valid departure airports for the chosen carrier
          if (this._$scope.calculator.carrierSelected !== '') {
            for (var e = this._$scope.calculator.airports_origin.length-1; e >= 0; e--) {
              var airport = this._$scope.calculator.airports_origin[e];
              var exclude = true;
              for ( var a in this._$scope.calculator.data){
                var chkAirport = this._$scope.calculator.data[a];
                if ( chkAirport.origin === airport.value && this._$scope.calculator.carrierSelected === chkAirport.carrier) {
                  exclude = false;
                }
              }
              if (exclude) {
                this._$scope.calculator.airports_origin.splice(e,1);
                //delete this._$scope.calculator.airports_origin[e];
              }
            }
          }
          // forcing initial values
          if (this._$scope.calculator.mainOrigin.value !== '') {
            this._$scope.calculator.originSelected = this._$scope.calculator.mainOrigin;
          }
          if (this._$scope.calculator.mainDestination.value !== '') {
            this._$scope.calculator.destinationSelected = this._$scope.calculator.mainDestination;
          }
        }.bind(this));
      }.bind(this));
    }.bind(this));
  }

  CalculatorCtrl.prototype._filterAirports = function () {
    this._$scope.calculator.result.length = 0;
    if (this._$scope.calculator.originSelected) {
      var first;
      var origin = this._$scope.calculator.originSelected.value;
      var data = this._$scope.calculator.data;
      var carrier = this._$scope.calculator.carrierSelected;
      var filtered = {};
      for ( var a in data){
        var airport = data[a];
        airport.carrierName = this._$scope.calculator.carriers[airport.carrier];
        if (airport.origin === origin && (carrier === '' || carrier === airport.carrier) ) {
          filtered[airport.destination] = 'OK';
        }
      }
      if (!this._$scope.calculator.firstLoad) {
        this._$scope.calculator.airports_destination.length = 0;
      }
      for (var b in filtered) {
        var airports = this._$scope.calculator.airports_origin;
        for (var c in airports) {
          if (airports[c].value === b) {
            if(!first){
              first = airports[c];
            }
            this._$scope.calculator.airports_destination.push(airports[c]);
          }
        }
      }
      if (!this._$scope.calculator.firstLoad) {
        this._$scope.calculator.destinationSelected = first;
      }
    }
    if (this._$scope.calculator.originSelected && this._$scope.calculator.destinationSelected) {
      this._execCalc();
    }
    //hack to not get digest errors with angular
    this._$timeout(function () {
      $('.header-selector select').change();
    });
  };

  CalculatorCtrl.prototype._execCalc = function () {
    this._$scope.calculator.result.length = 0;
    this._$scope.calculator.requiresConnection = false;
    if (this._$scope.calculator.originSelected && this._$scope.calculator.destinationSelected) {
      var origin = this._$scope.calculator.originSelected.value;
      var destination = this._$scope.calculator.destinationSelected.value;
      var data = this._$scope.calculator.data;
      var carrier = this._$scope.calculator.carrierSelected;
      this._$scope.calculator.result.length = 0;
      for ( var a in data){
        var airport = data[a];
        if (airport.origin === origin && airport.destination === destination && airport.tripType === this._$scope.calculator.typeSelected) {
          airport.taxesAndFees = '$' + airport.taxesAndFees.split('$').join('');
          if ( this._$scope.calculator.carrierSelected === '' || carrier === airport.carrier) {
            if (airport.connectingFlight==='true') {
              this._$scope.calculator.requiresConnection = true;
            }
            this._$scope.calculator.result.push( airport );
          }
        }
      }
      this._$scope.calculator.firstLoad = false;
    }
  };

  return CalculatorCtrl;
});
