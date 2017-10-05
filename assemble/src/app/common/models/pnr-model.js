define([
  'angular',
  'common/models/serial-model',
  'common/models/address-model',
  'common/models/payment-option-model',
  'common/models/fare-model'
], function (
  angular,
  SerialModel,
  AddressModel,
  PaymentOptionModel,
  FareModel) {
  'use strict';

  var FlightModel = function (data) {
    this.init(data);
  };

  FlightModel.prototype = new SerialModel();

  FlightModel.prototype._schema = {
    type: 'object',
    properties: {
      flightId: {type: 'number'},
      flightNum: {type: 'string'},
      aircraftType: {type: 'string'},
      arrival: {type: 'string'},
      arrivalDateTime: {type: 'string'},
      classOfService: {type: 'string'},
      cabinType: {type: 'string'},
      departure: {type: 'string'},
      departureDateTime: {type: 'string'},
      flownSegment: {type: 'boolean'},
      marketingAirline: {type: 'string'},
      segNum: {type: 'number'},
      status: {type: 'string'},
      withinACSWindow: {type: 'boolean'},
      thruFlight: {type: 'boolean'}
    }
  };

  FlightModel.prototype._deserializerMappings = {
    defaultMap: {
      flightId: 'flightId',
      flightNum: 'flightNum',
      thruFlight: 'thruFlight',
      aircraftType: 'aircraftType',
      cabinType: 'cabinType',
      arrival: 'arrival',
      arrivalDateTime: 'arrivalDateTime',
      classOfService: 'classOfService',
      departure: 'departure',
      departureDateTime: 'departureDateTime',
      flownSegment: 'flownSegment',
      marketingAirline: 'marketingAirline',
      segNum: 'segNum',
      status: 'status',
      withinACSWindow: 'withinACSWindow'
    }
  };

  FlightModel.prototype._serializerMappings = {
    seatMap: {
      flightNum: 'flightNum',
      departure: 'departure',
      arrival: 'arrival',
      departureDateTime: 'departureDateTime',
      classOfService: 'classOfService',
      cabinType: 'tier'
    }
  };

  var PNRModel = function (data) {
    this.init(data);
  };

  PNRModel.prototype = new SerialModel();

  PNRModel.prototype._schema = {
    type: 'object',
    properties: {
      pnr: {type: 'string'},
      tripType: {type: 'string'},
      international: {type: 'boolean'},
      pointsBooking: {type: 'boolean'},
      flightList: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            origin: {type: 'string'},
            destination: {type: 'string'},
            checkInEligibility: {type: 'string'},
            departureDateTime: {type: 'string'},
            arrivalDateTime: {type: 'string'},
            flightNum: {type: 'string'},
            flightId: {type: 'number'},
            paxCheckInInfo: {
              type: 'array',
              optional: true,
              items: {
                status: {type: 'string'},
                guestId: {type: 'string'},
              }
            },
            segments: {
              type: 'array',
              items: {
                anyOf: [
                  {
                    properties: '#/definitions/FlightModel'
                  },
                  {
                    properties: {
                      type: 'object',
                      properties: {
                        destination: {type: 'string'},
                        origin: {type: 'string'},
                        flightConnections: {
                          type: 'array',
                          items: '#/definitions/FlightModel'
                        }
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      },
      paxList: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            firstName: {type: 'string'},
            guestId: {type: 'string'},
            lastName: {type: 'string'},
            loyaltyId: {type: 'string'},
            loyaltyProgram: {type: 'string'},
            ticketNum: {type: 'string'},
            tierLevel: {type: 'string'},
            paxType: {type: 'string'}
          }
        }
      },
      seatList: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            seatNumber: {type: 'string'},
            guestId: {type: 'string'},
            flightNum: {type: 'string'},
            flightId: {type: 'number'},
            aisle: {type: 'boolean'},
            mce: {type: 'boolean'}
          }
        }
      },
      fareInfo: {
        type: 'object',
        properties: {
          totalCost: {type: 'number'},
          fareInfoList: {
            type: 'array',
            items: '#/definitions/FareModel'
          }
        }
      },
      AddressInfo: '#/definitions/AddressModel',
      paymentInfo: '#/definitions/PaymentOptionModel',
      contact: {
        type: 'object',
        properties: {
          email: {type: 'string'}
        }
      }
    }
  };

  PNRModel.prototype._deserializeCheckedInPax = function (segACSInfo) {
    var paxCheckInInfo = [];
    if (segACSInfo && segACSInfo.paxListInfo.length) {
      for (var paxListInfoIndex in segACSInfo.paxListInfo) {
        var paxCheckInInfoItem = {
          status: segACSInfo.paxListInfo[paxListInfoIndex].acsStatus,
          guestId: segACSInfo.paxListInfo[paxListInfoIndex].guestId
        };
        paxCheckInInfo.push(paxCheckInInfoItem);
      }
    }
    return paxCheckInInfo;
  };

  PNRModel.prototype._defaultPNRDeserializer = function (json, self) {
    var objData;
    if (json.pnrInfo) {
      // came from checkin
      objData = json.pnrInfo;
    } else {
      // came from change
      objData = json;
    }

    if (objData.pnr) {
      self.pnr = objData.pnr;
      self.tripType = objData.tripType;
      self.international = objData.international;

      /* Flight List */
      self.flightList = [ ];
      for (var i in objData.oAndDList) {
        var oAndD;
        var flight = {
          destination: objData.oAndDList[i].destination,
          origin: objData.oAndDList[i].origin,
          checkInEligibility: objData.oAndDList[i].checkInEligibility,
          segments: [],
          paxCheckInInfo: []
        };
        if (objData.oAndDList[i].connectingFlightList) {
          var connectingFlightList = objData.oAndDList[i].connectingFlightList;
          flight.departureDateTime =
            connectingFlightList[0].flightSeg.departureDateTime;
          flight.arrivalDateTime =
            connectingFlightList[connectingFlightList.length - 1]
            .flightSeg.arrivalDateTime;
          flight.flightNum = connectingFlightList[0].flightSeg.flightNum;
          flight.flightId = connectingFlightList[0].flightSeg.flightId;

          flight.paxCheckInInfo = self._deserializeCheckedInPax(
            connectingFlightList[0].flightSeg.segACSInfo
          );

          for (var s in objData.oAndDList[i].connectingFlightList) {
            var segmentForConnection = new FlightModel();
            oAndD = objData.oAndDList[i].connectingFlightList[s].flightSeg;
            segmentForConnection.deserialize(oAndD, 'defaultMap');
            flight.segments.push(segmentForConnection);
          }
        } else if (objData.oAndDList[i].flightSegList) {
          var thruFlightList = objData.oAndDList[i].flightSegList;
          flight.departureDateTime = thruFlightList[0].departureDateTime;
          flight.arrivalDateTime =
            thruFlightList[thruFlightList.length - 1].arrivalDateTime;
          flight.flightNum = thruFlightList[0].flightNum;
          flight.flightId = thruFlightList[0].flightId;
          for (var thruSegment in thruFlightList) {
            var segmentForThruFlight = new FlightModel();
            oAndD = objData.oAndDList[i].flightSegList[thruSegment];
            segmentForThruFlight.deserialize(oAndD, 'defaultMap');
            flight.segments.push(segmentForThruFlight);
          }
        } else {
          var segment = new FlightModel();
          oAndD = objData.oAndDList[i].flightSeg;
          segment.deserialize(oAndD, 'defaultMap');
          flight.departureDateTime = segment.departureDateTime;
          flight.arrivalDateTime = segment.arrivalDateTime;
          flight.flightNum = segment.flightNum;
          flight.flightId = segment.flightId;
          flight.paxCheckInInfo = self._deserializeCheckedInPax(oAndD.segACSInfo);
          flight.segments.push(segment);
        }
        self.flightList.push(flight);
      }

      /* paxList */
      self.paxList = [ ];
      for (var j in objData.paxList) {
        var paxData = objData.paxList[j];
        var pax = angular.copy(this._PaxModel, {});
        pax.guestId = paxData.guestId;
        pax.ticketNum = paxData.ticketNum;
        pax.firstName = paxData.firstName;
        pax.lastName = paxData.lastName;
        if (paxData.loyaltyInfo) {
          pax.loyaltyId = paxData.loyaltyInfo.loyaltyId;
          pax.loyaltyProgram = paxData.loyaltyInfo.loyaltyProgram;
          pax.tierLevel = paxData.loyaltyInfo.tierLevel;
        }
        pax.paxType = paxData.paxType;
        self.paxList.push(pax);
      }

      /* Seat List */
      self.seatList = [];
      for (var k in objData.seatInfoList) {
        var seatInfoListData = objData.seatInfoList[k];
        self.seatList.push({
          flightId: seatInfoListData.flightId,
          flightNum: seatInfoListData.flightNum,
          guestId: seatInfoListData.guestId,
          seatNum: seatInfoListData.seat.seatNumber,
          aisle: seatInfoListData.seat.aisle,
          mce: seatInfoListData.seat.mce
        });
      }

      if (objData.paymentInfo) {
        self.paymentInfo = new PaymentOptionModel();
        self.paymentInfo.deserialize(objData.paymentInfo.paymentInfo, 'pnr');
      }

      if (objData.addressInfo) {
        self.addressInfo = new AddressModel();
        self.addressInfo.deserialize(objData.addressInfo, 'pnr');
      }

      if (objData.pnrFareInfo) {
        self.fareInfo = {
          totalCost: objData.pnrFareInfo.pnrTotalCost,
          fareInfoList: []
        };

        for (var fareInfoIndex in objData.pnrFareInfo.fareInformation) {
          var fareInformation = new FareModel();
          fareInformation.deserialize(
            objData.pnrFareInfo.fareInformation[fareInfoIndex], 'pnr'
          );
          self.fareInfo.fareInfoList.push(fareInformation);
        }
      }

      self.pointsBooking = objData.pointsBooking;

      // Contact data
      if (objData.contact) {
        self.contact = {
          email: objData.contact.email
        };
      }
    }
  };

  PNRModel.prototype._customDeserializers = {
    checkin: PNRModel.prototype._defaultPNRDeserializer,
    purchase: PNRModel.prototype._defaultPNRDeserializer,
    accountInfo: PNRModel.prototype._defaultPNRDeserializer
  };

  return PNRModel;

});
