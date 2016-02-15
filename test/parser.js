'use strict';

var assert = require('assert');
var parser = require('../lib/parser');
var settings = require('node-weixin-settings');
var path = require('path');

describe('parser', function () {
  it('should get parser config', function (done) {
    parser('0', settings, path.resolve(__dirname, './fixtures/config.json'), function (data) {
      console.log(data);
      done();
    });
  });

  it('should get parser config', function (done) {
    var errored = false;
    try {
      parser('0', settings, path.resolve(__dirname, './fixtures/wrong.json'), function () {
        assert(false);
        done();
      });
    } catch (e) {
      console.log(e);
      errored = true;
    }
    assert.equal(true, errored);
    done();
  });

  it('should failed to parser config', function (done) {
    var catched = false;
    try {
      parser('0', settings, path.resolve(__dirname, './fixtures/wrong.json'), function () {
        assert(false);
        done();
      });
    } catch (e) {
      console.log(e.message);
      assert.equal(true, e.message === '{"key":"scope","reason":"Not validate key scope"}');
      catched = true;
    }
    assert.equal(true, catched);
    done();
  });

  it('should failed to parser json', function (done) {
    var catched = false;
    try {
      parser('0', settings, path.resolve(__dirname, './fixtures/bad.json'), function () {
        assert(false);
        done();
      });
    } catch (e) {
      assert.equal(true, e instanceof SyntaxError);
      catched = true;
    }
    assert.equal(true, catched);
    done();
  });
});


