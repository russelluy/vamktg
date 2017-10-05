define(['common/models/serial-model'], function (SerialModel) {
  'use strict';

  var AddressModel = function (data) {
    this.init(data);
  };

  AddressModel.prototype = new SerialModel();

  AddressModel.prototype._schema = {
    type: 'object',
    properties: {
      name: {type: 'string'},
      addressOne: {type: 'string'},
      addressTwo: {type: 'string', optional: true},
      city: {type: 'string'},
      state: {type: 'string'},
      country: {type: 'string'},
      zip: {type: 'string'},
      type: {type: 'string', optional: true},
      primary: {type: 'boolean', optional: true},
      addressName: {type: 'string', optional: true},
      index: {type: 'number', optional: true}
    }
  };

  AddressModel.prototype._elevateMap = {
    addressOne: 'addressOne',
    addressTwo: 'addressTwo',
    city: 'city',
    state: 'state',
    country: 'country',
    zip: 'zipCode',
    type: 'addressType',
    addressName: 'addressName',
    primary: 'primary',
    sequenceNum: 'sequenceNum'
  };

  AddressModel.prototype._defaultMap = {
    addressOne: 'addressOne',
    addressTwo: 'addressTwo',
    city: 'city',
    state: 'state',
    country: 'country',
    zip: 'zipCode',
    type: 'addressType'
  };

  AddressModel.prototype._editMap = {
    addressOne: 'addressOne',
    addressTwo: 'addressTwo',
    name: 'fullName',
    city: 'city',
    state: 'state',
    country: 'country',
    zip: 'zip',
    addressName: 'nickname'
  };

  AddressModel.prototype._deserializerMappings = {
    pnr: AddressModel.prototype._defaultMap,
    elevate: AddressModel.prototype._elevateMap,
    edit: AddressModel.prototype._editMap
  };

  AddressModel.prototype._serializerMappings = {
    purchase: AddressModel.prototype._defaultMap,
    elevate: AddressModel.prototype._elevateMap,
    edit: AddressModel.prototype._editMap
  };

  return AddressModel;

});
