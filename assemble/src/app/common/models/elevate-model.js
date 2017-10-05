define([
  'common/models/serial-model',
  'common/models/account-info-model',
  'common/models/traveler-model'
], function (
  SerialModel,
  AccountInfoModel,
  TravelerModel
  ) {
  'use strict';

  var ElevateModel = function (data) {
    this.init(data);
  };

  ElevateModel.prototype = new SerialModel();
  ElevateModel.prototype.constructor = ElevateModel;

  ElevateModel.TIERS = {
    RED: 'red',
    SILVER: 'silver',
    GOLD: 'gold'
  };

  ElevateModel.prototype._schema = {
    type: 'object',
    properties: {
      elevateId: {type: 'string'},
      eid: {type: 'string'},
      avatar: {type: 'string', optional: true},
      emailId: {type: 'string'},
      firstName: {type: 'string'},
      lastName: {type: 'string'},
      foundingMember: {type: 'boolean'},
      numOfPointsAvailable: {type: 'integer'},
      numOfPointsToNextTier: {type: 'number'},
      numberOfTierQualifyingPoints: {type: 'number'},
      status: {type: 'string'},
      tierLevel: {type: 'string'},
      authToken: {type: 'string'},
      accountInfo: AccountInfoModel.prototype._schema,
    }
  };

  ElevateModel.prototype._serializerMappings = {
    persistence: {
      elevateId: 'elevateId',
      firstName: 'firstName',
      lastName: 'lastName',
      avatar: 'avatar',
      status: 'status',
      emailId: 'emailId',
      numOfPointsAvailable: 'numOfPointsAvailable',
      tierLevel: 'tierLevel'
    }
  };

  ElevateModel.prototype._deserializerMappings = {
    persistence: {
      elevateId: 'elevateId',
      firstName: 'firstName',
      lastName: 'lastName',
      avatar: 'avatar',
      status: 'status',
      emailId: 'emailId',
      numOfPointsAvailable: 'numOfPointsAvailable',
      tierLevel: 'tierLevel'
    }
  };

  ElevateModel.prototype._travelerModelSerializer = function (self) {
    var model = new TravelerModel({
      // guid: '',
      // guestId: '',
      // ticketNum: '',
      travelerType: 'primary',
      primary: true,
      name: {
        first: self.firstName,
        last: self.lastName,
      },
      dob: self.accountInfo.personDetail.dateOfBirth,
      gender: self.accountInfo.personDetail.gender,
      contact: {
        email: self.emailId
      },
      avatar: self.avatar,
      // frequentFlyer: {
      //   program: '',
      //   number: ''
      // },
      // redressNum: '',
      // knownTravelerNum: '',
      // international: {
      //   passportCountry: '',
      //   passportExpires: '',
      //   citizenship: '',
      //   countryOfResidence: '',
      //   emergencyContact: {
      //     name: '',
      //     phone: ''
      //   }
      // }
    });

    if (self.accountInfo.phoneInfoList && self.accountInfo.phoneInfoList.length > 0) {
      model.contact.phone =
        self.accountInfo.phoneInfoList[0].areaCode +
        self.accountInfo.phoneInfoList[0].number;
    }

    return model;
  };

  ElevateModel.prototype._profileModifyChangeSerializer = function (self) {
    var diffModel = self.diff();
    diffModel.accountInfo.accountInfo = self.accountInfo.accountInfo;
    diffModel.accountInfo._savedState.isPartial = true;
    var serializedModel = diffModel.accountInfo.serialize('elevate');
    serializedModel.authToken = self.authToken;
    serializedModel.elevateId = self.elevateId;

    return serializedModel;
  };

  ElevateModel.prototype._customSerializers = {
    travelerModel: ElevateModel.prototype._travelerModelSerializer,
    profileModifyChange: ElevateModel.prototype._profileModifyChangeSerializer
  };

  return ElevateModel;
});