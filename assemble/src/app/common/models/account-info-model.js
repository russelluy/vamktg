define([
  'angular',
  'common/models/serial-model',
  'common/models/address-model',
  'common/models/payment-option-model',
  'common/models/pnr-model',
  'common/models/pnr-summary-model'
], function (
  angular,
  SerialModel,
  AddressModel,
  PaymentOptionModel,
  PNRModel,
  PNRSummaryModel
  ) {
  'use strict';

  var AccountInfoModel = function (data) {
    this.init(data);
  };

  AccountInfoModel.PersonDetail = function (data) {
    this.init(data);
  };

  AccountInfoModel.PersonDetail.prototype = new SerialModel();

  AccountInfoModel.PersonDetail.prototype._schema = {
    type: 'object',
    properties: {
      firstName: {type: 'string'},
      lastName: {type: 'string'},
      gender: {type: 'string'},
      dateOfBirth: {type: 'string'},
      redressNumber: {type: 'string', optional: true},
      knwnTravelerNumber: {type: 'string', optional: true},
      preCheckOption: {type: 'string', optional: true}
    }
  };

  AccountInfoModel.PersonDetail.prototype._elevateMap = {
    firstName: 'firstName',
    lastName: 'lastName',
    gender: 'gender',
    dateOfBirth: 'dateOfBirth',
    redressNumber: 'redressNumber',
    knwnTravelerNumber: 'knwnTravelerNumber',
    preCheckOption: 'preCheckOption'
  };

  AccountInfoModel.PersonDetail.prototype._serializerMappings = {
    elevate: AccountInfoModel.PersonDetail.prototype._elevateMap
  };

  AccountInfoModel.PersonDetail.prototype._deserializerMappings = {
    elevate: AccountInfoModel.PersonDetail.prototype._elevateMap
  };

  AccountInfoModel.PhoneInfoModel = function (data) {
    this.init(data);
  };

  AccountInfoModel.PhoneInfoModel.prototype = new SerialModel();

  AccountInfoModel.PhoneInfoModel.prototype._schema = {
    type: 'object',
    properties: {
      areaCode: {type: 'string'},
      contactType: {type: 'string'},
      number: {type: 'string'},
      primary: {type: 'boolean'},
      sequenceNum: {type: 'number'},
      phoneName: {type: 'string', optional: true}
    }
  };

  AccountInfoModel.PhoneInfoModel.prototype._elevateMap = {
    areaCode: 'areaCode',
    contactType: 'contactType',
    number: 'number',
    primary: 'primary',
    sequenceNum: 'sequenceNum',
    phoneName: 'phoneName'
  };

  AccountInfoModel.PhoneInfoModel.prototype._serializerMappings = {
    elevate: AccountInfoModel.PhoneInfoModel.prototype._elevateMap
  };

  AccountInfoModel.PhoneInfoModel.prototype._deserializerMappings = {
    elevate: AccountInfoModel.PhoneInfoModel.prototype._elevateMap
  };

  AccountInfoModel.EmailInfoModel = function (data) {
    this.init(data);
  };

  AccountInfoModel.EmailInfoModel.prototype = new SerialModel();

  AccountInfoModel.EmailInfoModel.prototype._schema = {
    type: 'object',
    properties: {
      address: {type: 'string'},
      type: {type: 'string'},
      sequenceNum: {type: 'number'},
      primary: {type: 'boolean'}
    }
  };

  AccountInfoModel.EmailInfoModel.prototype._elevateMap = {
    address: 'address',
    type: 'emailType',
    sequenceNum: 'sequenceNum',
    primary: 'primary'
  };

  AccountInfoModel.EmailInfoModel.prototype._serializerMappings = {
    elevate: AccountInfoModel.EmailInfoModel.prototype._elevateMap
  };

  AccountInfoModel.EmailInfoModel.prototype._deserializerMappings = {
    elevate: AccountInfoModel.EmailInfoModel.prototype._elevateMap
  };

  AccountInfoModel.CompanionModel = function (data) {
    this.init(data);
  };

  AccountInfoModel.CompanionModel.prototype = new SerialModel();
  AccountInfoModel.CompanionModel.prototype.constructor = AccountInfoModel.CompanionModel;

  AccountInfoModel.CompanionModel.prototype._schema = {
    type: 'object',
    properties: {
      firstName: {type: 'string'},
      lastName: {type: 'string'},
      relation: {type: 'string'},
      sequenceNum: {type: 'integer'}
    }
  };

  AccountInfoModel.CompanionModel.prototype._elevateMap = {
    firstName: 'firstName',
    lastName: 'lastName',
    relation: 'relation',
    sequenceNum: 'sequenceNum'
  };

  AccountInfoModel.CompanionModel.prototype._deserializerMappings = {
    elevate: AccountInfoModel.CompanionModel.prototype._elevateMap
  };

  AccountInfoModel.CompanionModel.prototype._serializerMappings = {
    elevate: AccountInfoModel.CompanionModel.prototype._elevateMap
  };

  AccountInfoModel.GuestPreferenceModel = function (data) {
    this.init(data);
  };

  AccountInfoModel.GuestPreferenceModel.prototype = new SerialModel();
  AccountInfoModel.GuestPreferenceModel.prototype.constructor =
    AccountInfoModel.GuestPreferenceModel;

  AccountInfoModel.GuestPreferenceModel.prototype._schema  = {
    type: 'object',
    properties: {
      homeAirPort: {type: 'string'},
      seatingPreference: {type: 'string'},
      favoriteDestination: {type: 'string'}
    }
  };

  AccountInfoModel.GuestPreferenceModel.prototype._elevateMap = {
    homeAirPort: 'homeAirPort',
    seatingPreference: 'seatingPreference',
    favoriteDestination: 'favoriteDestination'
  };

  AccountInfoModel.GuestPreferenceModel.prototype._serializerMappings = {
    elevate: AccountInfoModel.GuestPreferenceModel.prototype._elevateMap
  };

  AccountInfoModel.GuestPreferenceModel.prototype._deserializerMappings = {
    elevate: AccountInfoModel.GuestPreferenceModel.prototype._elevateMap
  };

  AccountInfoModel.prototype = new SerialModel();
  AccountInfoModel.prototype.constructor = AccountInfoModel;
  AccountInfoModel.constructor = SerialModel.prototype.constructor;

  AccountInfoModel.prototype._schema = {
    type: 'object',
    properties: {
      elevateInfo: {
        eid: {type: 'string'}
      },
      addressInfo: {
        type: 'array',
        items: '#/definitions/AddressModel'
      },
      creditCardInfo: {
        type: 'array',
        items: '#/definitions/PaymentOptionModel'
      },
      personDetail : '#/definitions/AccountInfoModel.PersonDetail',
      phoneInfoList: {
        type: 'array',
        items: '#/definitions/AccountInfoModel.PhoneInfoModel'
      },
      checkinPNRList: {
        type: 'array',
        items: PNRModel.prototype._schema
      },
      managePNRList: {
        type: 'array',
        items: PNRModel.prototype._schema
      }
    },
    definitions: {
      AddressModel: AddressModel.prototype._schema,
      PaymentOptionModel: PaymentOptionModel.prototype._schema
    }
  };

  AccountInfoModel.prototype._customDeserializers = {
    accountInfo: function (json, self) {
      self.addressInfo = [ ];
      var addressInfoList = json.addressInfoList;
      for (var addressInfoIndex in json.addressInfoList) {
        self.addressInfo.push(new AddressModel(addressInfoList[addressInfoIndex]));
      }

      self.creditCardInfo = [ ];
      for (var paymentInfoIndex in json.creditCardInfoList) {
        var paymentInfo = new PaymentOptionModel();
        paymentInfo.deserialize(json.creditCardInfoList[paymentInfoIndex], 'elevate');
        self.creditCardInfo.push(paymentInfo);
      }
      self.personDetail = new AccountInfoModel.PersonDetail();
      self.personDetail.deserialize(json.personDetail, 'elevate');

      self.phoneInfoList = [];
      for (var phoneInfoIndex in json.phoneInfoList) {
        var phoneItem = new AccountInfoModel.PhoneInfoModel();
        phoneItem.deserialize(json.phoneInfoList[phoneInfoIndex], 'elevate');
        self.phoneInfoList.push(phoneItem);
      }
      self.checkinPNRList = [ ];
      for (var checkinPnrIndex in json.checkingPNRList) {
        var checkinPnrModel = new PNRModel();
        checkinPnrModel.deserialize(json.checkingPNRList[checkinPnrIndex], 'accountInfo');
        self.checkinPNRList.push(checkinPnrModel);
      }

      self.managePNRList = [];
      var manageDetail = json.manageFlightDetail;
      if (manageDetail && Object.keys(manageDetail).length > 0) {
        // first PNR
        var managePnrModel = new PNRModel();
        managePnrModel.deserialize(manageDetail.firstPnrInfo, 'accountInfo');
        self.managePNRList.push(managePnrModel);
        // other, incomplete PNRs
        for (var managePnrIndex in manageDetail.pnrList) {
          managePnrModel = new PNRSummaryModel();
          managePnrModel.deserialize(manageDetail.pnrList[managePnrIndex], 'accountInfo');
          self.managePNRList.push(managePnrModel);
        }
      }

      self.accountInfo = {
        eid: json.elevateAccount.eid,
        elevateId: json.elevateAccount.elevateId,
        lastName: json.elevateAccount.lastName
      };
    }
  };

  return AccountInfoModel;
});