define([
  'angular',
  'common/models/serial-model'
], function (
  angular,
  SerialModel
) {
  'use strict';

  var FlightModel = function (data) {
    this.init(data);
    this.isSummary = true;
  };

  FlightModel.prototype = new SerialModel();

  FlightModel.prototype._schema = {
    type: 'object',
    properties: {
      flightNum: {type: 'string'},
      bookingDateTime: {type: 'string'},
      arrivalDateTime: {type: 'string'},
      departureDateTime: {type: 'string'},
      classOfService: {type: 'string'},
      status: {type: 'string'},
      origin: {type: 'string'},
      destination: {type: 'string'},
      lastName: {type: 'string', optional: true}
    }
  };

  FlightModel.prototype._deserializerMappings = {
    accountInfo: {
      flightNum: 'flightNumber',
      bookingDateTime: 'bookingDateTime',
      arrivalDateTime: 'arrivalDateTime',
      departureDateTime: 'departureDateTime',
      classOfService: 'classOfService',
      status: 'status',
      origin: 'origin',
      destination: 'dest',
      lastName: 'lastName'
    }
  };

  var PNRSummaryModel = function (data) {
    this.init(data);
    this.isSummary = true;
  };

  PNRSummaryModel.prototype = new SerialModel();

  PNRSummaryModel.prototype._schema = {
    type: 'object',
    properties: {
      pnr: {type: 'string'},
      flightList: {
        type: 'array',
        items: '#/definitions/FlightModel'
      }
    }
  };

  PNRSummaryModel.prototype._customDeserializers = {
    accountInfo: function (json, self) {
      self.pnr = json.pnr;
      self.flightList = [];
      var flight;
      for (var i = 0; i < json.segDetails.length; i ++) {
        flight = new FlightModel();
        flight.deserialize(json.segDetails[i], 'accountInfo');
        self.flightList.push(flight);
      }
    }
  };

  return PNRSummaryModel;

});
