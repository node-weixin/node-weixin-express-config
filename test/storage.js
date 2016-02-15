'use strict';

var assert = require('assert');
var settings = require('node-weixin-settings');
var storageFunc = require('../lib/storage');

describe('storage', function () {
  var storage = storageFunc(settings);
  var result = {a: 'a', b: 'b', c: 'c'};
  it('should set right data', function (done) {
    storage.set(0, 'app', result, function () {
      assert(true, true);
      done();
    });
  });

  it('should get right data', function (done) {
    storage.get(0, 'app', function (data) {
      assert.equal(true, data.a === result.a);
      assert.equal(true, data.b === result.b);
      assert.equal(true, data.c === result.c);
      done();
    });
  });

  it('should set wrong data', function (done) {
    try {
      storage.set(0, 'ddd', result, function () {
        assert(false);
        done();
      });
    } catch (e) {
      assert.equal(true, e instanceof Error);
      done();
    }
  });

  it('should get wrong data', function (done) {
    try {
      storage.get(0, 'ddd', function () {
        assert(false);
        done();
      });
    } catch (e) {
      assert.equal(true, e instanceof Error);
      done();
    }
  });
});


