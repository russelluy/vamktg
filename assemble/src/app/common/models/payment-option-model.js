define([
  'angular',
  'common/models/serial-model',
  'common/models/address-model'
], function (
  angular,
  SerialModel,
  AddressModel
) {
  'use strict';

  var PaymentOptionModel = function (data) {
    this.init(data);
    this.guid = this.addGuid();
  };

  PaymentOptionModel.prototype = new SerialModel();

  PaymentOptionModel.prototype._schema = {
    type: 'object',
    properties: {
      guid: {type: 'string', optional: true},
      ccNumber: {type: 'string'},
      paymentAmount: {type: 'number', optional: true},
      securityCode: {type: 'string', minLength: 3, maxLength: 4, optional: true},
      type: {type: 'string'},
      expiryDate: {type: 'string'},
      summary: {type: 'string', optional: true},
      nickname: {type: 'string', optional: true},
      cardHolderName: {type: 'string', optional: true},
      shouldSave: {type: 'boolean', optional: true},
      sequenceNum: {type: 'number'},
      address: {
        anyOf: [
          {
            properties: '#/definitions/AddressModel'
          },
          {
            properties: {
              type: 'array',
              items: '#/definitions/AddressModel'
            }
          },
          {
            type: 'number'
          }
        ]
      }
    }
  };

  PaymentOptionModel.prototype._customTypes = {
    'AddressModel': AddressModel
  };

  PaymentOptionModel.prototype._customSerializers = {
    purchase: function (self) {
      var json = {
        ccNumber: self.ccNumber,
        securityCode: self.securityCode,
        cardType: self.type,
        expiryDate: self.expiryDate,
        paymentAmount: self.paymentAmount,
        cardHolderName: self.cardHolderName,
        sequenceNum: self.sequenceNum
      };

      if (self.shouldSave) {
        json.sequenceNum = 0;
        json.mapAdressId = 0;
      }

      return json;
    },
    edit: function (self) {
      var json = {
        creditCard: self.ccNumber,
        securityNumber: self.securityCode,
        expireYear: parseInt(self.expiryDate.split('-')[0]),
        expireMonth: parseInt(self.expiryDate.split('-')[1]),
        cardholderName: self.cardHolderName,
        nickname: self.nickname
      };

      if (Object.prototype.toString.call(self.address) === '[object Array]') {
        json.address = [];
        angular.forEach(self.address, function (value) {
          json.address.push(value.serialize('edit'));
        });
      } else {
        json.address = self.address.serialize('edit');
      }

      return json;
    }
  };

  PaymentOptionModel.prototype._elevateMap = {
    ccNumber: 'ccNumber',
    securityCode: 'securityCode',
    type: 'cardType',
    expiryDate: 'expiryDate',
    address: 'mapAddressId',
    nameOnCard: 'nameOnCard',
    sequenceNum: 'sequenceNum',
    primary: 'primary',
    nickname: 'identifiedName'
  };

  PaymentOptionModel.prototype._serializerMappings = {
    elevate: PaymentOptionModel.prototype._elevateMap,
    purchae: PaymentOptionModel.prototype._elevateMap
  };

  PaymentOptionModel.prototype._deserializerMappings = {
    purchase: {
      ccNumber: 'ccNumber',
      securityCode: 'securityCode',
      type: 'cardType',
      expiryDate: 'expiryDate'
    },
    pnr: {
      ccNumber: 'ccNumber',
      type: 'cardType',
      nameOnCard: 'cardHolderName'
    }
  };

  PaymentOptionModel.prototype._customDeserializers = {
    elevate: function (json, self) {
      var addressList = [];
      for (var addressIndex in json.addressInfo) {
        var address = new AddressModel();
        address.deserialize(json.addressInfo[addressIndex], 'elevate');
        addressList.push(address);
      }
      angular.extend(self, {
        ccNumber: json.ccNumber,
        type: json.cardType,
        expiryDate: json.expiryDate,
        address: addressList,
        cardHolderName: json.cardHolderName,
        primary: json.primary,
        nickname: json.identifiedName,
        sequenceNum: json.sequenceNum
      });
    }
  };

  PaymentOptionModel.VISA = 'visa';
  PaymentOptionModel.AMEX = 'amex';
  PaymentOptionModel.MASTER = 'mastercard';
  PaymentOptionModel.DISCOVER = 'discover';
  PaymentOptionModel.UATP = 'uatp';
  PaymentOptionModel.VIRGIN = 'virgin';
  PaymentOptionModel.TRAVELBANK = 'travelbank';

  PaymentOptionModel.OPTION_NAMES = {
    visa: 'Visa',
    amex: 'American Express',
    mastercard: 'MasterCard',
    discover: 'Discover',
    uatp: 'UATP',
    virgin: 'Virgin America Card',
    travelbank: 'Travel Bank'
  };

  PaymentOptionModel.prototype.getTitle = function () {
    var title = '';
    if (this.type === PaymentOptionModel.VIRGIN ||
      this.type === PaymentOptionModel.TRAVELBANK) {
      title = PaymentOptionModel.OPTION_NAMES[this.type.toLowerCase()];
    } else {
      title = PaymentOptionModel.OPTION_NAMES[this.type.toLowerCase()] +
      ' ending ' +
      this.ccNumber.toString().substr(-4);
    }

    return title;
  };

  return PaymentOptionModel;
});