define([
  'common/models/serial-model',
  'common/models/seat-model'
], function (
  SerialModel,
  SeatModel
  )  {
  'use strict';

  var SeatMapModel = function (data) {
    this.init(data);
  };

  SeatMapModel.prototype = new SerialModel();

  SeatMapModel.prototype._schema = {
    type: 'object',
    properties: {
      cabinAvailability: {
        type: 'object',
        properties: {
          first: {type: 'boolean'},
          main: {type: 'boolean'},
          mcs: {type: 'boolean'}
        }
      },
      seatMap: {
        type: 'array',
        items: {
          cost: {type: 'number'},
          exitRow: {type: 'boolean'},
          name: {type: 'string'},
          rows: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                exitRow: {type: 'boolean'},
                seats: {
                  type: 'array',
                  items: SeatModel.prototype._schema
                }
              }
            }
          }
        }
      }
    }
  };

  SeatMapModel.prototype._isSeatOpen = function (selectedTier, seat) {
    // Let's not forget the open property of the seat.
    // If it was not considered, we might get false positives.
    var isOpen = seat.open;

    // Check if the seat is first class.
    var seatIsFirstClass = seat.cabinType === 'FIRST' ||
      seat.cabinType === 'FIRST_CABIN_REFUNDABLE';

    // Check if the seat is mcs.
    var seatIsMcs = seat.cabinType === 'MCS' ||
      seat.cabinType === 'INSTANT_UPG_TO_MCS';

    // For first class, only first class seats are enabled.
    if (selectedTier === 'first' || selectedTier === 'firstRefundable') {
      isOpen = isOpen && seatIsFirstClass;
    }

    // For mcs class, first class and mcs seats are enabled.
    if (selectedTier === 'mcs' || selectedTier === 'mcsUpgrade') {
      isOpen = isOpen && (seatIsFirstClass || seatIsMcs);
    }

    return isOpen;
  };


  SeatMapModel.prototype._transformGalleryRow = function (data) {
    var rawData = data;

    if (rawData.length > 1) {

      var rowBeforeTheLastRow = rawData[rawData.length - 2];
      var lastRow = rawData[rawData.length - 1];

      var l1 = Object.keys(rowBeforeTheLastRow.columns).length;
      var l2 = Object.keys(lastRow.columns).length;

      if (l1 > l2) {

        var cloneOrigin = lastRow.columns[Object.keys(lastRow.columns)[0]];

        var diff = l1 - l2;

        for (var j = 0; j < diff; j++) {

          var clonedSeat = {
            virtual: true,
            aisle: false,
            cabinType: cloneOrigin.cabinType,
            exitRow: cloneOrigin.exitRow,
            open: false,
            seatLetter: 'VRTL',
            seatNumber: 'virtualSeat' + j,
            window: false
          };

          rawData[rawData.length - 1].columns['virtualSeat' + j] = clonedSeat;
        }
      }
    }

    return rawData;
  };

  SeatMapModel.prototype._customDeserializers = {
    seatMap: function (json, self, args) {

      // An empty array that is going to contain the section information.
      var flightClasses = [];
      var service = args.service;

      // Make sure that if necessary, virtual seats are added for the gallery.
      var rawData = self._transformGalleryRow(json);

      var shouldDisableExitRow = service.hasChildrenInfantsOrPets();
      var seatOpen;

      var seatModel;

      var cabinAvailability = {
        main: false,
        mcs: false,
        first: false
      };

      // Iterate through rows.
      for (var i in rawData) {

        // flag indicating the aisle for these two is set.s
        var isPreviousAisle = false;

        var isExitRow = rawData[i].characteristicList !== null &&
          rawData[i].characteristicList !== undefined &&
          rawData[i].characteristicList
            .indexOf('EXIT') > -1;

        // Iterate through seats.
        for (var key in rawData[i].columns) {
          var flightClass = {
            name: null,
            rows: {},
            exitRow: isExitRow
          };

          // Get the name of the section (and whether it's MCE)
          flightClass.name =
            rawData[i].characteristicList.indexOf('MCE') > -1 ?
            'MCE' :
            rawData[i].columns[key].cabinType;

          // Persist upgrade options.
          var _upgradeOptionsReverseMap = {
            FIRST: 'first',
            MCS: 'mcs',
            MC: 'main',
            MCE: 'main'
          };

          var rsmModel = service._flatRequestSeatMapModels[args.index];
          var classIndex = _upgradeOptionsReverseMap[flightClass.name];

          var currencyIdentifier = (rsmModel.cost && rsmModel.cost.points === null) ?
            'dollarFare' : 'pointsFare';

          var currencyProperty = (rsmModel.cost && rsmModel.cost.points === null) ?
            'totalFare' : 'totalPoints';

          // There needs to be a check like this because of the data inconsistency
          // With seatch and seatmap API responses.
          flightClass.cost =
            (rsmModel.tiers &&
              typeof rsmModel.tiers[classIndex][currencyIdentifier] !== 'undefined') ?
              rsmModel.tiers[classIndex][currencyIdentifier][currencyProperty] : '';

          var aisleSeat = null;

          if (rawData[i].columns[key].aisle === true && !isPreviousAisle) {
            aisleSeat = {isAisle: true};
            isPreviousAisle = true;
          } else {
            isPreviousAisle = false;
          }

          // Apply the seatOpen toggler. In a nutshell, if the seat
          // is of a lower tier than the tier selected, seat should
          // not be open. E.G.: If MCS is selected, main cabin seats
          // should not be available.
          rawData[i].columns[key].open = seatOpen = self._isSeatOpen(rsmModel.tier,
            rawData[i].columns[key]);

          // Anyway, if this is an exit row seat and there are
          // children, pets or infants, seat should not be open.
          if (isExitRow && shouldDisableExitRow) {
            rawData[i].columns[key].open = false;
          }

          if (seatOpen) {
            cabinAvailability[_upgradeOptionsReverseMap[flightClass.name]] = true;
          }

          // Let's add the random photo of the robot here, sice doing it
          // Anywhere above will trigger random number generation on scope
          // digests which will block the browser.
          rawData[i].columns[key].robotImage = Math.floor(Math.random() *
            (14 - 1 + 1)) + 1;

          // If the flight classes array is empty
          // OR if there is an entry for that class but is not
          // the previous one (split sections case), then create a new
          // entry.
          if (flightClasses.length === 0 ||
            (flightClasses.length > 0 &&
              flightClasses[flightClasses.length - 1].name !==
                flightClass.name)) {

            flightClass.rows[rawData[i].rowNumber] =
              flightClass.rows[rawData[i].rowNumber] ||
              { exitRow: isExitRow };

            flightClass.rows[rawData[i].rowNumber].seats =
              flightClass.rows[rawData[i].rowNumber].seats || {};

            seatModel = flightClass.rows[rawData[i].rowNumber].seats[key] =
              new SeatModel(rawData[i].columns[key]);

            if (aisleSeat !== null) {
              flightClass.rows[rawData[i].rowNumber].seats[key + i + 'aisle'] =
                new SeatModel(aisleSeat);
            }

            flightClasses.push(flightClass);

            // If there is an entry for this section and it's the previous one
            // (most common, sequential case) then just update the side.
          } else {
            flightClasses[flightClasses.length - 1]
              .rows[rawData[i].rowNumber] =
              flightClasses[flightClasses.length - 1]
                .rows[rawData[i].rowNumber] || {};

            flightClasses[flightClasses.length - 1]
              .rows[rawData[i].rowNumber].exitRow = isExitRow;

            flightClasses[flightClasses.length - 1]
              .rows[rawData[i].rowNumber].seats =
              flightClasses[flightClasses.length - 1]
                .rows[rawData[i].rowNumber].seats || {};

            seatModel = flightClasses[flightClasses.length - 1]
              .rows[rawData[i].rowNumber].seats[key] =
              new SeatModel(rawData[i].columns[key]);

            if (aisleSeat !== null) {
              flightClasses[flightClasses.length - 1]
                .rows[rawData[i].rowNumber].seats[key + i + 'aisle'] =
                new SeatModel(aisleSeat);
            }
          }

          /*
            If we have existing seats, apply selected states to the SeatModel
            before we render.
          */
          if (args.existingSeats) {
            for (var e in args.existingSeats) {
              if (seatModel.seatNumber === args.existingSeats[e].seatNum) {
                seatModel.selected = true;
                seatModel.travelerGuid = args.existingSeats[e].travelerGuid;
              }
            }
          }

        }
      }

      self.cabinAvailability = cabinAvailability;
      self.seatMap = flightClasses;
    }
  };

  return SeatMapModel;
});