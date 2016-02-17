'use strict';

var assert = require('assert');
var nodeWeixinExpressConfig = require('../lib');

describe('node-weixin-express-config', function () {
  it('should have unit test!', function () {
    assert.equal(true, nodeWeixinExpressConfig.parser instanceof Function);
    assert.equal(true, nodeWeixinExpressConfig.router instanceof Function);
  });
});


