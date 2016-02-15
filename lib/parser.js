'use strict';

var fs = require('fs');
var async = require('async');

var config = require('./validations/');

var validator = require('node-form-validator');

var storage = require('./storage');

var util = require('./urls');

function getSavorFunc(savor, id, k, json) {
  return function (cb) {
    savor.set(id, k, json[k], cb);
  };
}

module.exports = function (id, settings, file, next) {
  var json = fs.readFileSync(file);
  var saver = storage(settings);
  var error = {};
  var funcs = [];

  try {
    json = JSON.parse(String(json));
  } catch (e) {
    throw e;
  }

  for (var k in config) {
    if (!validator.validate(json[k], config[k], error)) {
      throw Error(JSON.stringify(error));
    }
    funcs.push(getSavorFunc(saver, id, k, json));
  }

  funcs.push(function (cb) {
    var url = 'http://' + (json.server.host || 'localhost') + '/';
    var prefix = json.server.prefix || 'weixin';
    var urls = util(url, prefix);
    settings.set(id, 'urls', urls, cb);
  });

  async.series(funcs, function () {
    next(id);
  });
};
