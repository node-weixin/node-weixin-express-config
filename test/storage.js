'use strict';

var assert = require('assert');
var settings = require('node-weixin-settings');
var storageFunc = require('../lib/storage');

describe('storage', function() {
  var storage = storageFunc(settings);
  var result = {
    id: 'a',
    secret: 'b',
    token: 'c'
  };
  it('should set right data', function(done) {
    storage.set(0, 'app', result, function() {
      assert(true, true);
      done();
    });
  });

  it('should get right data', function(done) {
    storage.get(0, 'app', function(data) {
      assert.equal(true, data.id === result.id);
      assert.equal(true, data.secret === result.secret);
      assert.equal(true, data.token === result.token);
      done();
    });
  });

  it('should set wrong data', function(done) {
    try {
      storage.set(0, 'ddd', result, function() {
        assert(false);
        done();
      });
    } catch (e) {
      assert.equal(true, e instanceof Error);
      done();
    }
  });

  it('should get wrong data', function(done) {
    try {
      storage.get(0, 'ddd', function() {
        assert(false);
        done();
      });
    } catch (e) {
      assert.equal(true, e instanceof Error);
      done();
    }
  });

  it('should get all data', function(done) {
    var parser = require('../lib/parser');
    var path = require('path');
    var id = '3';
    parser(id, settings, path.resolve(__dirname, './fixtures/config.json'), function() {
      storage.all(id, function(config) {
        assert.equal(true, config.app !== null);
        assert.equal(true, config.app.id === 'id');
        assert.equal(true, config.app.secret === 'secret');
        assert.equal(true, config.app.token === 'token');

        assert.equal(true, config.oauth !== null);
        assert.equal(true, config.oauth.state === 'STATE');
        assert.equal(true, config.oauth.scope === 0);

        assert.equal(true, config.merchant !== null);
        assert.equal(true, config.merchant.id === 'id');
        assert.equal(true, config.merchant.key === 'key');

        assert.equal(true, config.server !== null);
        assert.equal(true, config.server.host === 'www.sina.com.cn');
        assert.equal(true, config.server.prefix === 'weixin');

        assert.equal(true, config.certificate !== null);
        assert.equal(true, config.certificate.pfxBase64 === 'InRlc3QvYXNzZXRzL2NlcnQucDEyIg==');
        assert.equal(true, config.certificate.pfxKey === 'key');
        assert.equal(true, config.certificate.pfx instanceof Buffer);

        assert.equal(true, config.urls !== null);
        assert.equal(true, config.urls.auth !== null);
        assert.equal(true, config.urls.auth.ack === 'http://www.sina.com.cn/weixin/auth/ack');

        assert.equal(true, config.urls.oauth !== null);
        assert.equal(true, config.urls.oauth.access === 'http://www.sina.com.cn/weixin/oauth/access');
        assert.equal(true, config.urls.oauth.success === 'http://www.sina.com.cn/weixin/oauth/success');

        assert.equal(true, config.urls.jssdk !== null);
        assert.equal(true, config.urls.jssdk.config === 'http://www.sina.com.cn/weixin/jssdk/config');

        assert.equal(true, config.urls.pay !== null);
        assert.equal(true, config.urls.pay.callback === 'http://www.sina.com.cn/weixin/pay/callback');
        done();
      });
    });
  });
});
