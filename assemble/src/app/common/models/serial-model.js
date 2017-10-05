define(['angular', 'jquery', 'tv4'], function (angular, $, tv4) {
  'use strict';

  var SerialModel = function (data) {
    this._savedState =  {
      isPartial: false,
      model: {}
    };
    this.init(data);
  };

  SerialModel.prototype.init = function (data) {
    // add default data to Model
    if (data) {
      $.extend(this, data);
      if (!this._isSchemaValid()) {
        throw tv4.error;
      }
    }
  };

  /**
   * Private JSON schema (http://json-schema.org/) for validation
   * @type json
   */
  SerialModel.prototype._schema = {};

  /**
   * List of key-value mappings for serializing the model
   * @type Object
   */
  SerialModel.prototype._serializerMappings = {};

  /**
   * List of custom serializer functions for the model
   * @type Object
   */
  SerialModel.prototype._customSerializers = {};

  /**
   * List of key-value mappings for deserializing the model (modelName: 'jsonName')
   * @type Object
   */
  SerialModel.prototype._deserializerMappings = {};

  /**
   * List of custom deserializer functions for the model (modelName: 'jsonName')
   * @type Object
   */
  SerialModel.prototype._customDeserializers = {};

  SerialModel.prototype._generateHash = function () {
    var hash = function () {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };

    return [ hash(), hash(), '-',
      hash(), '-', hash(), '-',
      hash(), '-', hash(), hash(),
      hash()].join('');
  };

  /**
   * Add a GUID to model
   * @param {string} guid Optional guid to set manually.
   */
  SerialModel.prototype.addGuid = function () {
    this.guid = (this.guid) ? this.guid : this._generateHash();
    return this.guid;
  };

  /**
   * Model serialization (from Javascript object to JSON string)
   * @param  {string} format optional JSON format constant to be used
   * @return {string} JSON string representation
   */
  SerialModel.prototype.serialize = function (format, object, args) {
    this.sanitize();

    // Model is malformed
    if (!this._savedState.isPartial && !this._isSchemaValid()) {
      return false;
    }

    // if its a custom format
    if (format) {
      // if its a custom method
      if (this._customSerializers[format]) {
        return this._customSerializers[format](this, object, args);
      // if its a custom mapping
      } else if (this._serializerMappings[format]) {
        return this._serializeByMap(this._serializerMappings[format]);
      // custom format not found
      } else {
        return false;
      }
    }

    // default serialization
    return this;
  };

  /**
   * Model deserialization (from JSON string to Javascript object)
   * @param  {string} json JSON string to parse
   * @param  {string} format optional JSON format constant to be used
   * @return {boolean} true if successful
   */
  SerialModel.prototype.deserialize = function (json, format, args) {
    // if its a custom format
    if (format) {
      // if its a custom method
      if (this._customDeserializers[format]) {
        return this._customDeserializers[format](json, this, args);
      // if its a custom mapping
      } else if (this._deserializerMappings[format]) {
        return this._deserializeByMap(json, this._deserializerMappings[format], format);
      // custom format not found
      } else {
        return false;
      }
    }

    // default deserialization
    var jsonObject;
    try {
      jsonObject = JSON.parse(json);
    } catch (error) {
      return false;
    }

    if (jsonObject) {
      $.extend(this, jsonObject);
      // Checks if Model is according to schema
      return this._isSchemaValid();
    }
  };

  /**
   * Serialize object to JSON string based on a key-value mapping
   * @return {string} JSON string or false if error
   */
  SerialModel.prototype._serializeByMap = function (map) {
    var jsonObject = {};

    // TODO: multi-level maps
    for (var item in map) {
      if (map[item] && this[item]) {
        jsonObject[map[item]] = this[item];
      }
    }

    return jsonObject;
  };

  /**
   * Deserialize JSON string to object based on a key-value mapping
   * @param  {string} json JSON string for model
   * @param  {object} map  key-value pairs for deserializing
   * @return {boolean} true if success
   */

  SerialModel.prototype._deserializeAnyOf =
  function (jsonObject, item, map, format, customType) {
    var object = {};
    try {
      var jsonObjectIsArray = $.isArray(jsonObject[map[item]]);
      for (var anyOfItem in customType.anyOf) {
        if (!jsonObjectIsArray) {
          customType = customType.anyOf[anyOfItem].properties;
          break;
        } else if (jsonObjectIsArray &&
          typeof customType.anyOf[anyOfItem].properties !== 'undefined' &&
                customType.anyOf[anyOfItem].properties.type === 'array') {
          if (typeof object[item] === 'undefined') {
            object[item] = [ ];
          }
          customType = customType.anyOf[anyOfItem].properties.items;
          break;
        }
      }
      var newItemType = customType.split('/').pop();
      if (jsonObjectIsArray) {
        var self = this;
        $.each(jsonObject[map[item]], function (index, value) {
          var newItem = new self._customTypes[newItemType]();
          newItem.deserialize(value, format);
          object[item].push(newItem);
        });
      } else {
        object[item] = new this._customTypes[newItemType]();
        object[item].deserialize(jsonObject[map[item]], format);
      }
    } catch (error) {
      return false;
    }

    return object;
  };

  SerialModel.prototype._deserializeElement = function (jsonObject, map, format) {
    var object = {};
    for (var item in map) {
      if (map[item] &&
        typeof jsonObject[map[item]] !== 'undefined') {
        // check if the item is a $ref to another scheme
        var customType = this._schema.properties[item];
        if (typeof customType === 'string') {
          try {
            // create a new instance based on this._customTypes
            object[item] = new this._customTypes[customType.split('/').pop()]();
            object[item].deserialize(jsonObject[map[item]], format);
          } catch (error) {
            return false;
          }
        // Improve anyOf logic
        } else if (typeof customType !== 'undefined' &&
          typeof customType.anyOf !== 'undefined') {
          object[item] =
            this._deserializeAnyOf(jsonObject, item, map, format, customType);
        } else {
          object[item] = jsonObject[map[item]];
        }
      } else if (typeof map[item] === 'object') {
        if (this._schema.properties[item].type === 'array') {
          object[item] = [ ];
          for (var jsonItem in jsonObject[item]) {
            object[item].push(
              this._deserializeElement(jsonObject[item][jsonItem], map[item], format)
            );
          }
        }
      }
    }
    return object;
  };

  SerialModel.prototype._deserializeByMap = function (json, map, format) {
    var jsonObject;
    if (typeof json === 'string') {
      try {
        jsonObject = JSON.parse(json);
      } catch (error) {
        return false;
      }
    } else {
      jsonObject = json;
    }

    if (jsonObject) {
      $.extend(this, this._deserializeElement(jsonObject, map, format));
    } else {
      return false;
    }
  };

  /**
   * Adjust model according to its schema
   * Only removing undefined optional fields for now
   */
  SerialModel.prototype.sanitize = function () {
    this._sanitizeObject(this, null, this._schema);
  };

  SerialModel.prototype._sanitizeObject = function (parent, name, schema) {
    var obj = name ? parent[name] : parent;
    if (schema.optional === true && obj === undefined || obj === null) {
      delete parent[name];
    }

    if (typeof obj === 'undefined') {
      return;
    }

    if (schema.properties) {
      $.each(schema.properties, function (name, value) {
        this._sanitizeObject(obj, name, value);
      }.bind(this));
    }
  };

  /**
   * Save the latest model state
   **/
  SerialModel.prototype.saveLastState = function () {
    this._savedState.model = angular.copy(this);
  };

  SerialModel.prototype._diffModel = function (current, old) {
    var diffModel = null;
    for (var property in current) {
      if (current.hasOwnProperty(property) && old.hasOwnProperty(property)) {
        if (typeof current[property] === 'object') {
          var value = this._diffModel(current[property], old[property]);
          if (value) {
            if (!diffModel) {
              if ($.isArray(current)) {
                diffModel = [];
              } else {
                if ($.isPlainObject(current)) {
                  diffModel = {};
                } else {
                  diffModel = new current.constructor();
                }
              }
            }
            diffModel[property] = value;
          }
        } else {
          if (current[property] !== old[property]) {
            if (!$.isArray(current)) {
              return current;
            }

            if (!diffModel) {
              diffModel = [];
            }
            diffModel[property] = current[property];
          }
        }
      } else {
        if (!old.hasOwnProperty(property) && current.hasOwnProperty(property)) {
          if (!diffModel) {
            diffModel = {};
          }
          diffModel[property] = current[property];
        }
      }
    }

    return diffModel;
  };

  SerialModel.prototype.diff = function () {
    var diffModel = this._diffModel(this, this._savedState.model);
    diffModel._savedState.isPartial = true;
    return diffModel;
  };

  /**
   * Checks if model schema is valid
   * @private
   * @return  {boolean} true if valid
   */
  SerialModel.prototype._isSchemaValid = function () {
    return tv4.validate(this, this._schema);
  };

  SerialModel.prototype.reset = function () {
    for (var property in this) {
      if (this.hasOwnProperty(property)) {
        delete this[property];
      }
    }
  };

  return SerialModel;
});
