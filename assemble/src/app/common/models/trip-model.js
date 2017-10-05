define([
  'angular',
  'common/models/serial-model'
], function (
  angular,
  SerialModel
) {
  'use strict';

  var TripModel = function (data) {
    this.init(data);
  };

  TripModel.prototype = new SerialModel();

  TripModel.prototype._schema = {
    type: 'object',
    properties: {
      bookingType: {type: 'string'},
      cityPairs: {type: 'array'},
      dates: {type: 'array'},
      promoCode: {type: 'string'},
      travelers: {
        type: 'object',
        properties: {
          adults: {type: 'number'},
          children: {type: 'number'},
          infants: {type: 'number'},
          pets: {type: 'number'}
        }
      },
      tripType: {type: 'string'}
    }
  };

  TripModel.prototype._serializerMappings = {
    persistence: {
      bookingType: 'bookingType',
      cityPairs: 'cityPairs',
      dates: 'dates',
      travelers: 'travelers',
      tripType: 'tripType'
    }
  };

  TripModel.prototype._deserializerMappings = {
    persistence: {
      bookingType: 'bookingType',
      cityPairs: 'cityPairs',
      dates: 'dates',
      travelers: 'travelers',
      tripType: 'tripType'
    }
  };

  TripModel.prototype._customSerializers = {
    search: function (self) {
      var jsonObject = {
        origin: '',
        dest: '',
        departureDate: '',
        returningDate: '',
        numOfAdults: null,
        numOfChildren: null,
        numOfInfants: null,
        bookingType: 'DOLLAR',
        tripType: 'roundTrip',
        promoCode: null
      };
      // Handle city pairs
      if (self.cityPairs && self.cityPairs.length > 0) {
        angular.forEach(self.cityPairs, function (pair, idx) {
          if (self.tripType === 'ONE_WAY' || self.tripType === 'ROUND_TRIP') {
            if (idx === 0) {
              jsonObject.origin = pair.dep;
              jsonObject.dest = pair.des;
            }
          } else {
            if (idx === 0) {
              // Blow away useless attributes
              delete jsonObject.origin;
              delete jsonObject.dest;

              jsonObject.oneWayList = [ ];
            }
            jsonObject.oneWayList.push({
              origin: pair.dep,
              dest: pair.des
            });
          }
        }, this);
      }

      // Handle travelers
      jsonObject.numOfAdults = self.travelers.adults;
      jsonObject.numOfChildren = self.travelers.children;
      jsonObject.numOfInfants = self.travelers.infants;

      // Handle currency
      jsonObject.bookingType = self.bookingType || 'DOLLAR';

      // Handle Promotional code
      if (self.promoCode && self.promoCode.length !== 0) {
        jsonObject.promoCode = self.promoCode;
      }

      // Handle departure and returning date
      var currentTripType = self.tripType;

      // Is there any dates in the array before we start?
      if (self.dates && self.dates.length > 0) {
        var isOneWay = (currentTripType === 'ONE_WAY');

        /*
          The structure of the fare query is different for oneWay/roundTrip
          and multiCity, so we check here
        */
        if (currentTripType !== 'MULTI_CITY') {
          jsonObject.departureDate = self.dates[0];

          // If it's oneWay, or the second date pair for roundTrip,
          // we have all the data we need.
          if (isOneWay || (!isOneWay && self.dates.length > 1)) {
            jsonObject.returningDate = self.dates[1];
          }
        } else {
          angular.forEach(self.dates, function (date, idx) {
            // Store date depending on index
            jsonObject.oneWayList[idx].departureDate = date;
          });
        }
      }

      return jsonObject;
    }
  };

  return TripModel;
});
