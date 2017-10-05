define(function () {
  'use strict';

  var SaveToCalendarCtrl = function (
    $scope,
    $window,
    $modalInstance,
    manageService,
    pnrService,
    locationService,
    ResourceBundle
  ) {

    this._$scope = $scope;
    this._$window = $window;
    this._$modalInstance = $modalInstance;
    this._locationService = locationService;
    this._manageService = manageService;
    this._pnrService = pnrService;

    this.ResourceBundle = ResourceBundle;

    this._$scope.saveToCalendar = {
      saveToIcal: this.saveToIcal.bind(this),
      saveToOutlook: this.saveToOutlook.bind(this)
    };

  };

  // Injected dependencies
  SaveToCalendarCtrl.$inject = [
    '$scope',
    '$window',
    '$modalInstance',
    'manageService',
    'pnrService',
    'locationService',
    'ResourceBundle'
  ];

  SaveToCalendarCtrl.prototype.saveToIcal = function () {

    var flightIndex = this._$scope.flightIndex ? this._$scope.flightIndex : 0;

    var context = this._locationService.getContext();

    var pnr = context === 'manage' ?
      this._manageService.getPnrModel() : this._pnrService.model();

    if (pnr) {
      var currentPnr = pnr[0];
      if (currentPnr) {
        this._downloadIcalFile(currentPnr, flightIndex);
      }
    }

    this._$modalInstance.close();
  };

  SaveToCalendarCtrl.prototype.saveToOutlook = function () {
    this.saveToIcal();
  };

  SaveToCalendarCtrl.prototype._downloadIcalFile = function (pnr, flightIndex) {

    // Ical entry subject line.
    var subject = this.ResourceBundle.ical.subjectPrefix +
                  ' ' +
                  pnr.flightList[flightIndex].flightNum +
                  '|' +
                  pnr.flightList[flightIndex].origin +
                  '-' +
                  pnr.flightList[flightIndex].destination;

    // Ical entry description line, basically the subject line expanded by PNR.
    var description = subject + '|' + pnr.pnr;

    var departureDateTime = pnr.flightList[flightIndex]
                               .departureDateFormats
                               .moment
                               .format('YYYY-MM-DDTHH:mm:ss');

    var arrivalDateTime = pnr.flightList[flightIndex]
                             .arrivalDateFormats
                             .moment
                             .format('YYYY-MM-DDTHH:mm:ss');

    var url = this._manageService.getCalendarUrl(
      subject,
      description,
      departureDateTime,
      arrivalDateTime
    );

    this._$window.open(url);
  };

  return SaveToCalendarCtrl;
});