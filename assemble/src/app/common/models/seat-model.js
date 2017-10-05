define([
  'common/models/serial-model',
], function (
  SerialModel
  ) {
  'use strict';

  var SeatModel = function (data) {
    this.init(data);
  };

  SeatModel.prototype = new SerialModel();

  SeatModel.prototype._schema = {
    type: 'object',
    properties: {
      aisle: {type: 'boolean'},
      cabinType: {type: 'string'},
      exitRow: {type: 'boolean'},
      mce: {type: 'boolean'},
      middle: {type: 'boolean'},
      nonRecline: {type: 'boolean'},
      open: {type: 'boolean'},
      robotImage: {type: 'number'},
      seatLetter: {type: 'string'},
      seatNumber: {type: 'string'},
      selected: {type: 'boolean'},
      window: {type: 'boolean'}
    }
  };

  SeatModel.prototype._deserializerMappings = {
    seat: {
      aisle: 'aisle',
      cabinType: 'cabinType',
      exitRow: 'exitRow',
      mce: 'mce',
      middle: 'middle',
      nonRecline: 'nonRecline',
      open: 'open',
      robotImage: 'robotImage',
      seatLetter: 'seatLetter',
      seatNumber: 'seatNumber',
      selected: 'selected',
      window: 'window'
    }
  };

  return SeatModel;
});