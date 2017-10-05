define([
  'common/models/serial-model',
], function (
  SerialModel
) {
  'use strict';

  var FareModel = function (data) {
    this.init(data);
  };

  FareModel.prototype = new SerialModel();

  FareModel.prototype._schema = {
    type: 'object',
    properties: {
      base: {type: 'number'},
      total: {type: 'number'},
      isInternational: {type: 'boolean', optional: 'true'},
      taxDetails: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            code: {type: 'string'},
            amount: {type: 'number'},
            name: {type: 'string', optional: 'true'}
          }
        }
      }
    }
  };

  FareModel.prototype._deserializerMappings = {
    pnr: {
      base: 'BaseFare',
      total: 'totalFare',
      taxDetails: { code: 'taxCode', amount: 'taxAmount'}
    },
    fare: { // We need to verify if this map is valid
      base: 'baseFare',
      total: 'totalFare',
      isInternational: 'international',
      taxDetails: { code: 'taxCode', amount: 'taxAmount', name: 'taxName' }
    }
  };

  return FareModel;
});
