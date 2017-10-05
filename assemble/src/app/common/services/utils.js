define(['angular', 'moment'], function (angular, moment) {
  'use strict';

  var UtilsService = function (
    ResourceBundle
  ) {
    this._resourceBundle = ResourceBundle;

    // randomize default avatars
    this._randomAvatarsDefault =
      this.randomizeArray(this._resourceBundle.avatarsDefaultMap);

    // combine all avatars into a single array
    this._randomAvatarsAll = this._randomAvatarsDefault.concat(
      this._resourceBundle.avatarsSpecialMap
    );

    this._randomAvatarsAllRemain = angular.copy(this._randomAvatarsAll);

    return {
      randomizeArray: this.randomizeArray.bind(this),
      getRandomAvatarsDefault: this.getRandomAvatarsDefault.bind(this),
      getRandomAvatarsAll: this.getRandomAvatarsAll.bind(this),
      getRandomAvatarsAllRemain: this.getRandomAvatarsAllRemain.bind(this),
      getFFProgramName: this.getFFProgramName.bind(this),
      getRandomAvatar: this.getRandomAvatar.bind(this),
      getCabinTypeLabel: this.getCabinTypeLabel.bind(this),
      getTripTypeLabel: this.getTripTypeLabel.bind(this),
      //getFlightDatesExtendedModel: this.getFlightDatesExtendedModel.bind(this),
      formatDates: this.formatDates.bind(this),
      getTripDatesString: this.getTripDatesString.bind(this),
      getTripSummaryString: this.getTripSummaryString.bind(this),
      getElevatePoints: this.getElevatePoints.bind(this),
      safeHTML: this.safeHTML.bind(this)
    };
  };

  UtilsService.$inject = [
    'ResourceBundle'
  ];

  UtilsService.prototype.randomizeArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  UtilsService.prototype.getRandomAvatarsDefault = function () {
    return this._randomAvatarsDefault;
  };

  UtilsService.prototype.getRandomAvatarsAll = function () {
    return this._randomAvatarsAll;
  };

  UtilsService.prototype.getRandomAvatarsAllRemain = function () {
    return this._randomAvatarsAllRemain;
  };

  UtilsService.prototype.removeAvatarFromArray = function (avatar) {
    var i = this._randomAvatarsAllRemain.indexOf(avatar);

    this._randomAvatarsAllRemain.splice(i, 1);
  };

  UtilsService.prototype.addAvatarToArray = function (avatar) {
    this._randomAvatarsAllRemain.unshift(avatar);
  };

  UtilsService.prototype.getFFProgramName = function (ffCode, nickname) {

    var programName;

    angular.forEach(this._resourceBundle.ffPrograms, function (program) {
      if (!programName && program.value === ffCode) {
        programName = (nickname) ? program.nickname : program.name;
      }
    });

    return programName;
  };

  UtilsService.prototype.getRandomAvatar = function () {
    var defaultAvatars = this._resourceBundle.avatarsDefaultMap;

    return defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];
  };

  UtilsService.prototype.getCabinTypeLabel = function (code) {
    var cabinLabel;

    angular.forEach(
      this._resourceBundle.flightInformation.tier.name,
      function (tier, key) {
        if (!cabinLabel && key === code) {
          cabinLabel = tier;
        }
      }
    );

    return cabinLabel;
  };

  UtilsService.prototype.getTripTypeLabel = function (type) {
    var ttLabel;

    angular.forEach(
      this._resourceBundle.flightInformation.tripType,
      function (tt, key) {
        if (!ttLabel && key === type) {
          ttLabel = tt;
        }
      }
    );

    return ttLabel;
  };

  UtilsService.prototype.formatDates = function (dateArray) {
    var formattedDates = [];
    var date;
    var mDate;
    var dateObj;
    var i;

    for (i in dateArray) {
      date = dateArray[i];
      mDate = moment(date);

      dateObj = {
        dayOfWeek: mDate.format('ddd'),
        date: mDate.format('DD'),
        dateOfMonth: mDate.format('Do'),
        moment: mDate,
        month: mDate.format('MMM'),
        monthNum: mDate.format('MM'),
        year: mDate.format('YYYY'),
        yearAbbr: mDate.format('YY')
      };

      formattedDates.push(dateObj);
    }

    return formattedDates;
  };

  UtilsService.prototype.getTripDatesString = function (dates, oneWay) {
    // returns format 'Mar 11th-Mar 23rd'

    var string = '';
    var departing = dates[0];
    var returning = (dates[3]) ? dates[3] : dates[1];
    var sameDay = departing.dateOfMonth === returning.dateOfMonth;
    var sameMonth = departing.monthNum === returning.monthNum;

    if (oneWay || (sameDay && sameMonth)) {
      string = departing.month + ' ' + departing.dateOfMonth;
    } else if (sameMonth) {
      string = departing.month + ' ' + departing.dateOfMonth + '-' +
        returning.dateOfMonth;
    } else {
      string = departing.month + ' ' + departing.dateOfMonth + '-' +
        returning.month + ' ' + returning.dateOfMonth;
    }

    return string;
  };

  UtilsService.prototype.getTripSummaryString = function (trip) {
    // returns e.g.
    // Round Trip, San Francisco to Los Angeles (one way/round trip)
    // Multi City, San Francisco to Los Angeles, Portland to Seattle (multi city)

    var tripSummary = (trip.tripType === 'MULTI_CITY') ?
      trip.flightList[0].originName + ' to ' + trip.flightList[0].destinationName + ', ' +
      trip.flightList[1].originName + ' to ' + trip.flightList[1].destinationName :
      trip.flightList[0].originName + ' to ' + trip.flightList[0].destinationName;

    return trip.tripTypeLabel + ', ' + tripSummary;
  };

  UtilsService.prototype.getElevatePoints = function (baseFare, tier) {
    var multipliers = this._resourceBundle.elevatePointsMultiplier;

    // default to Elevate Red tier multiplier, if tier undefined
    return Math.round(multipliers[tier || 'RED'] * baseFare);
  };

  UtilsService.prototype.safeHTML = function (data) {
    if (data) {
      var e = document.createElement('div');
      e.innerHTML = data;
      var newHTML = e.childNodes[0].nodeValue;
      return newHTML;
    } else {
      return;
    }
  };

  return UtilsService;
});