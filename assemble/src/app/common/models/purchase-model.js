define([
  'common/models/serial-model',
  'common/models/payment-option-model'
], function (
  SerialModel,
  PaymentOptionModel
) {
  'use strict';

  var PurchaseModel = function (data) {
    this.init(data);
  };

  PurchaseModel.prototype = new SerialModel();

  PurchaseModel.prototype._schema = {
    type: 'object',
    properties: {
      fares: {type: 'array'},
      taxes: {type: 'object'},
      hasTravelInsurance: {type: 'boolean'},
      hasOptIn: {type: 'boolean'},
      travelBank: {
        type: 'object',
        properties: {
          accountNum: {type: 'string'},
          balance: {type: 'string'},
          isApplied: {type: 'boolean'}
        }
      },
      paymentOption: '#/definitions/PaymentOption',
      paymentType: {type: 'string'}
    },
    definitions: {
      'PaymentOption': PaymentOptionModel.prototype._schema
    }
  };

  PurchaseModel.prototype._customTypes = {
    'PaymentOption': PaymentOptionModel
  };

  PurchaseModel.PAYMENT_TYPE_MONEY = 'money';
  PurchaseModel.PAYMENT_TYPE_POINTS = 'points';

  PurchaseModel.prototype._serializerMappings = {
    purchase: {
      paymentOption: PaymentOptionModel.prototype._serializerMappings.purchase
    }
  };

  PurchaseModel.prototype._deserializerMappings = {
    purchase: {
      paymentOption: PaymentOptionModel.prototype._deserializerMappings.purchase
    }
  };

  PurchaseModel.prototype.isPaymentPoints = function () {
    return this.paymentType === PurchaseModel.PAYMENT_TYPE_POINTS;
  };

  return PurchaseModel;

});
