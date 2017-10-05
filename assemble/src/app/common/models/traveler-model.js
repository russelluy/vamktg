define(['jquery', 'common/models/serial-model'], function ($, SerialModel) {
  'use strict';

  var TravelerModel = function (data) {
    this.init(data);
  };

  TravelerModel.prototype = new SerialModel();

  TravelerModel.prototype._schema = {
    type: 'object',
    properties: {
      guid: {type: 'string'},
      guestId: {
        optional: true,
        anyOf: [ // This is insane
          {type: 'number'},
          {type: 'string'}
        ]
      },
      ticketNum: {type: 'string', optional: true},
      travelerType: {type: 'string'},
      primary: {type: 'boolean'},
      status: {type: 'string', optional: 'true'},
      name: {
        type: 'object',
        properties: {
          first: {type: 'string'},
          middle: {type: 'string', optional: true},
          last: {type: 'string'}
        }
      },
      dob: {type: 'string'},
      gender: {type: 'string'},
      contact: {
        type: 'object',
        properties: {
          email: {type: 'string', optional: true},
          phone: {type: 'string', optional: true}
        }
      },
      avatar: {type: 'string'},
      frequentFlyer: {
        type: 'object',
        optional: true,
        properties: {
          program: {type: 'string'},
          number: {type: 'string'}
        }
      },
      redressNum: {type: 'string', optional: true},
      knownTravelerNum: {type: 'string', optional: true},
      elevateMemberInfo: {
        type: 'object',
        optional: true,
        properties: {
          elevateId: {type: 'string'},
          program: {type: 'string'}
        }
      },
      international: {
        type: 'object',
        optional: true,
        properties: {
          passportNum: {type: 'string', optional: true},
          passportCountry: {type: 'string', optional: true},
          passportExpires: {type: 'string', optional: true},
          citizenship: {type: 'string', optional: true},
          countryOfResidence: {type: 'string', optional: true},
          emergencyContact: {
            type: 'object',
            optional: true,
            properties: {
              name: {type: 'string', optional: true},
              phone: {type: 'string', optional: true}
            }
          }
        }
      }
    }
  };

  TravelerModel.prototype._customDeserializers = {
    travelerInfo: function (json, self) {
      var travelerType;
      var isPrimary = false;

      if (json.travelerType === 'primary') {
        travelerType = 'ADULT';
        isPrimary = true;
      } else {
        travelerType = json.travelerType.toUpperCase();
      }

      $.extend(self, {
        travelerType: travelerType,
        primary: isPrimary,
        avatar: json.avatar,
        name: {
          first: json.firstName,
          middle: json.middleName,
          last: json.lastName
        },
        dob: json.dob,
        contact: {
          phone: json.phone,
          email: json.email
        },
        gender: json.sex,
        frequentFlyer: {
          program: json.frequentFlyer || '',
          number: json.frequentFlyerNumber || ''
        },
        knownTravelerNum: json.knownTravelerNumber,
        redressNum: json.redressNumber,
        international: {
          passportCountry: json.issuingCountry,
          passportExpires: json.expirationDate,
          citizenship: json.citizenship,
          countryOfResidence: json.residence,
          emergencyContact: {
            name: json.emergencyName,
            phone: json.emergencyPhone
          }
        }
      });
    }
  };

  TravelerModel.prototype._purchaseSerialize = function (self) {
    var json = {
      firstName: self.name.first,
      middleName: self.name.middle,
      lastName: self.name.last,
      type: self.travelerType.toUpperCase(),
      gender: self.gender,
      passportNum: self.international.passportNum,
      passportDate: self.international.passportExpires,
      issuingCountry: self.international.passportCountry,
      citizenship: self.international.citizenship,
      countryOfResidence: self.international.countryOfResidence,
      emergencyContactName: self.international.emergencyContact.name,
      emergencyContactNum: self.international.emergencyContact.phone,
      dob: self.dob,
      knownTravelerNum: self.knownTravelerNum,
      redressNum: self.redressNum,
      elevateMemberInfo: self.elevateMemberInfo
      // elevateMemberInfo: {
      //   memberShipId: '75430208809',
      //   program: 'VX'
      // }
    };

    return json;
  };

  TravelerModel.prototype._paxSerialize = function (self) {
    return {
      firstName: self.name.first,
      lastName: self.name.last,
      guestId: self.guestId,
      ticketNum: self.ticketNum
    };
  };

  TravelerModel.prototype._travelerInfoSerialize = function (self) {
    return {
      avatar: self.avatar,
      email: self.contact.email,
      firstName: self.name.first,
      frequentFlyer: self.frequentFlyer ? self.frequentFlyer.program : null,
      frequentFlyerNumber: self.frequentFlyer ? self.frequentFlyer.number : null,
      knownTravelerNumber: self.knownTravelerNum,
      lastName: self.name.last,
      middleName: self.name.middle,
      phone: self.contact.phone,
      redressNumber: self.redressNum,
      sex: self.gender,
      travelerType: self.travelerType,
      dob: self.dob
    };
  };

  TravelerModel.prototype._customSerializers = {
    purchase: TravelerModel.prototype._purchaseSerialize,
    pax: TravelerModel.prototype._paxSerialize,
    travelerInfo: TravelerModel.prototype._travelerInfoSerialize
  };

  return TravelerModel;

});
