define([
  'angular',
  'common/models/serial-model',
  'common/models/payment-option-model'
], function (
  angular,
  SerialModel,
  PaymentOptionModel) {
  'use strict';

  var PaxCheckinModel = function (data) {
    this.init(data);
  };

  PaxCheckinModel.prototype = new SerialModel();

  PaxCheckinModel.prototype._schema = {
    type: 'object',
    properties: {
      guestId: {type: 'string'},
      lastName: {type: 'string'},
      firstName: {type: 'string'}
    }
  };

  PaxCheckinModel.prototype._deserializerMappings = {
    checkin: {
      guestId: 'guestId',
      lastName: 'lastName',
      firstName: 'firstName'
    }
  };

  var CheckinModel = function (data) {
    this.init(data);
  };

  CheckinModel.prototype = new SerialModel();

  CheckinModel.prototype._schema = {
    type: 'object',
    properties: {
      checkinInfo: {
        type: 'object',
        properties: {
          segList: {
            type: 'array',
            items: {
              flightNum: {type: 'string'},
              flightId: {type: 'number'}
            }
          },
          paxList: {
            type: 'array',
            items: '#/definitions/PaxCheckinModel'
          },
          baggageOption: {
            type: 'object',
            optional: 'true',
            properties: {
              baggageOandDList: {
                type: 'array',
                items: {
                  flightNum: {type: 'string'},
                  flightId: {type: 'string'},
                  paxList: {
                    type: 'array',
                    items: {
                      pax: '#/definitions/PaxCheckinModel',
                      numOfBag: {type: 'number'}
                    }
                  }
                }
              }
            }
          },
          upgradeOption: {
            type: 'object',
            optional: 'true',
            properties: {
              flightList: {
                type: 'array',
                items: {
                  flightNum: {type: 'string'},
                  flightId: {type: 'number'},
                  toBeUpgradedClass: {type: 'string'},
                  paxSeatList: {
                    type: 'array',
                    items: {
                      pax: '#/definitions/PaxCheckinModel',
                      seatNum: {type: 'string'}
                    }
                  }
                }
              }
            }
          }
        }
      },
      paymentInfo: {
        type: 'object',
        optional: 'true',
        properties: {
          creditCardInfo: '#/definitions/PaymentOptionModel'
        }
      },
      identificationInfo: {
        type: 'object',
        properties: {
          pnr: {type: 'string'},
          lastName: {type: 'string'}
        }
      }
    },
    definitions: {
      PaymentOptionModel: PaymentOptionModel.prototype._schema
    }
  };

  CheckinModel.prototype._basicSerialization = function (self) {
    return {
      checkinInfo: {
        segList: self.checkinInfo.segList,
        paxList: self.checkinInfo.paxList
      },
      identificationInfo: self.identificationInfo
    };
  };

  CheckinModel.prototype._baggageSerialization = function (self) {
    var serializer = self._basicSerialization(self);
    serializer.checkinInfo.baggageOption = self.checkinInfo.baggageOption;
    return serializer;
  };

  CheckinModel.prototype._completeCheckInSerializer = function (self) {
    self.paymentInfo = {
      'creditCardInfo': {
        'ccNumber': '4005111111111110',
        'securityCode': '123',
        'cardType': 'VISA',
        'expiryDate': '2016-12',
        'primary': false,
        'attachToProfile': false
      }
    };
    return {
      checkinInfo: self.checkinInfo,
      paymentInfo: self.paymentInfo,
      identificationInfo: self.identificationInfo
    };
  };

  CheckinModel.prototype._customSerializers = {
    basic: CheckinModel.prototype._basicSerialization,
    baggage: CheckinModel.prototype._baggageSerialization,
    completeCheckIn: CheckinModel.prototype._completeCheckInSerializer
  };

  CheckinModel.prototype._chooseFlights = function (object, self) {
    self.identificationInfo = object.identificationInfo;
    self.checkinInfo = {
      segList: [ ],
      paxList: [ ]
    };

    self.checkinInfo.segList = [ ];
    angular.forEach(object.flightList, function (value) {
      self.checkinInfo.segList.push({
        flightNum: value.flightNum,
        flightId: value.flightId
      });
    });

    angular.forEach(object.travelers, function (value) {
      var pax = new PaxCheckinModel();
      pax.deserialize(value, 'checkin');
      self.checkinInfo.paxList.push(pax);
    });
  };

  CheckinModel.prototype._baggageDeserializer = function (object, self) {
    var baggageOandDModel = {
      flightNum: null,
      flightId: null,
      paxList: [ ]
    };

    var baggageOandDList = [ ];
    angular.forEach(object, function (value) {
      var baggageOandDItem = angular.copy(baggageOandDModel);
      baggageOandDItem.flightNum = value.flightNum;
      baggageOandDItem.flightId = value.flightId;

      angular.forEach(value.paxList, function (value) {
        var paxItem = new PaxCheckinModel();
        paxItem.deserialize(value.pax, 'checkin');
        baggageOandDItem.paxList.push({
          pax: paxItem,
          numOfBag: value.numOfBag
        });
      });
      baggageOandDList.push(baggageOandDItem);
    });

    self.checkinInfo.baggageOption = {
      baggageOandDList: baggageOandDList
    };
  };

  CheckinModel.prototype._upgradeDeserializer = function (object, self) {
    var flightModel = {
      flightNum: null,
      flightId: null,
      toBeUpgradedClass: null,
      paxSeatList: [ ]
    };

    angular.forEach(object, function (value) {
      var flight = angular.copy(flightModel);
      flight.flightNum = value.flightNum;
      flight.flightId = value.flightId;
      flight.toBeUpgradedClass = value.toBeUpgradedClass;
      angular.forEach(object.paxSeatList, function (value) {
        var paxItem = new PaxCheckinModel();
        paxItem.deserialize(value.pax, 'checkin');
        var paxSeatItem = {
          pax: paxItem,
          seatNum: value.seatNum
        };
        flight.paxSeatList.push(paxSeatItem);
      });
      self.checkinInfo.flightList.push(flight);
    });
  };

  CheckinModel.prototype._loungeDeserializer = function (object, self) {
    var airportList = [];
    angular.forEach(object, function (flight, key) {
      angular.forEach(flight, function (lounge) {
        angular.forEach(self.checkinInfo.segList, function (segItem) {
          if (segItem.flightId === parseInt(key)) {
            var airportListItem = {
              flightNum: segItem.flightNum,
              flightId: segItem.flightId,
              airport: lounge.airport,
              paxList: [],
            };
            angular.forEach(self.checkinInfo.paxList, function (pax) {
              airportListItem.paxList.push({pax: pax});
            });
            airportList.push(airportListItem);
          }
        });
      });
    });

    if (airportList.length) {
      self.checkinInfo.loungeOption = {
        airportList: airportList
      };
    }
  };

  CheckinModel.prototype._customDeserializers = {
    chooseFlights: CheckinModel.prototype._chooseFlights,
    baggage: CheckinModel.prototype._baggageDeserializer,
    seatUpgrade: CheckinModel.prototype._upgradeDeserializer,
    lounge: CheckinModel.prototype._loungeDeserializer
  };

  return CheckinModel;
});
