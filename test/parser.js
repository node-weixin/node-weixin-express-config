'use strict';

var assert = require('assert');
var parser = require('../lib/parser');
var settings = require('node-weixin-settings');
var path = require('path');

describe('parser', function () {
  it('should get parser config', function (done) {
    parser('0', settings, path.resolve(__dirname, './fixtures/config.json'), function (config) {
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
      assert.equal(true, config.certificate.pfx === 'InRlc3QvYXNzZXRzL2NlcnQucDEyIg==');
      assert.equal(true, config.certificate.pfxKey === 'key');

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
      assert.equal(true, true);
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
