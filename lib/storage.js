'use strict';
var async = require('async');
var validator = require('node-form-validator');
var config = require('./validations/');

module.exports = function getStorage(settings) {

  var keys = ['app', 'oauth', 'merchant', 'message', 'server', 'certificate', 'urls'];

  return {
    get: function(id, key, next) {
      if (keys.indexOf(key) === -1) {
        throw new Error('Key Is Invalid!');
      }
      settings.get(id, key, function(value) {
        next(value);
      });
    },
    set: function(id, key, value, next) {
      if (keys.indexOf(key) === -1) {
        throw new Error('Key is invalid!');
      }
      var error = {};
      if (key === 'certificate') {
        var base64 = value.pfx.toString('base64');
        var data = {
          pfxKey: value.pfxKey,
          pfx: base64
        };
        value = data;
      }
      if (config[key]) {
        if (!validator.validate(value, config[key], error)) {
          throw Error(JSON.stringify(error));
        }
      }
      settings.set(id, key, value, function() {
        next(value);
      });
    },
    all: function(id, next) {
      var self = this;
      var values = {};
      async.map(keys, function(key, cb) {
        self.get(id, key, function(data) {
          values[key] = data;
          cb(null);
        });
      }, function() {
        next(values);
      });
    }
  };
};
