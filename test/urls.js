'use strict';

var assert = require('assert');
var urls = require('../lib/urls');

describe('urls', function () {
  it('should get urls', function () {
    var baseUrl = 'http://localhost/';
    var prefix = 'weixin';
    var newUrls = urls(baseUrl, prefix);
    var bound = baseUrl + prefix;
    assert.equal(true, newUrls.auth.ack === bound + '/auth/ack');
    assert.equal(true, newUrls.jssdk.config === bound + '/jssdk/config');
    assert.equal(true, newUrls.oauth.access === bound + '/oauth/access');
    assert.equal(true, newUrls.oauth.success === bound + '/oauth/success');
    assert.equal(true, newUrls.pay.callback === bound + '/pay/callback');
  });
});


