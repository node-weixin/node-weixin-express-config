'use strict';
var bodyParser = require('body-parser');
var assert = require('assert');
var setter = require('../lib/set');
var express = require('express')();
var settings = require('node-weixin-settings');
var fs = require('fs');

express.use(require('skipper')());
express.use(bodyParser.urlencoded({
  extended: false
}));
express.use(bodyParser.json());
express.use(bodyParser.raw({
  type: 'text/xml'
}));

// var router = weixinConfigRouter.set('id', settings, function callback(req, res, id, value) {
//   res.json({
//     id: id,
//     data: value
//   });
// });

console.log(setter);

setter.set(
  settings,
  express,
  // 数据处理完成后的回调函数
  // ID是保存数据唯一识别号，可以自己定义
  // value是所获取或者保存的数据
  function callback(req, res, id, value) {
    res.json({
      id: String(id),
      data: value
    });
  },
  function () {
    return 1;
  },
  // 获取数据识别ID的参数名
  'appId',
  '/weixin/config/:type'
);


describe('request', function () {
  // it('should have attributes', function () {
  //   assert.equal(true, router.__handlers instanceof Object);
  //   assert.equal(true, router.__handlers.get instanceof Function);
  //   assert.equal(true, router.__handlers.post instanceof Function);
  // });

  it('should set app config', function (done) {
    var request = require('supertest');
    request(express)
      .post('/weixin/config/app')
      .send({
        id: '1',
        token: 'token',
        secret: 'secret'
      })
      .expect(200)
      .end(function (error, res) {
        assert.equal(true, !error);
        console.log(res.body);
        assert.equal(true, res.body.id === '1');
        assert.equal(true, res.body.data.id === '1');
        assert.equal(true, res.body.data.secret === 'secret');
        assert.equal(true, res.body.data.token === 'token');
        done();
      });
  });

  it('should get app config', function (done) {
    var request = require('supertest');
    request(express)
      .get('/weixin/config/app')
      .expect(200)
      .end(function (error, res) {
        assert.equal(true, !error);
        assert.equal(true, res.body.id === '1');
        assert.equal(true, res.body.data !== null);
        assert.equal(true, res.body.data.id === '1');
        assert.equal(true, res.body.data.secret === 'secret');
        assert.equal(true, res.body.data.token === 'token');
        done();
      });
  });

  it('should set oauth config', function (done) {
    var request = require('supertest');
    request(express)
      .post('/weixin/config/oauth')
      .send({
        state: 'state',
        scope: 0
      })
      .expect(200)
      .end(function (error, res) {
        assert.equal(true, !error);
        assert.equal(true, res.body.id === '1');
        assert.equal(true, res.body.data.state === 'state');
        assert.equal(true, res.body.data.scope === 0);
        done();
      });
  });

  it('should get oauth config', function (done) {
    var request = require('supertest');
    request(express)
      .get('/weixin/config/oauth')
      .expect(200)
      .end(function (error, res) {
        assert.equal(true, !error);
        assert.equal(true, res.body.id === '1');
        assert.equal(true, res.body.data !== null);
        assert.equal(true, res.body.data.state === 'state');
        assert.equal(true, res.body.data.scope === 0);
        done();
      });
  });


  it('should set merchant config', function (done) {
    var request = require('supertest');
    request(express)
      .post('/weixin/config/merchant')
      .send({
        id: 'id',
        key: 'key'
      })
      .expect(200)
      .end(function (error, res) {
        assert.equal(true, !error);
        assert.equal(true, res.body.id === '1');
        assert.equal(true, res.body.data.id === 'id');
        assert.equal(true, res.body.data.key === 'key');
        done();
      });
  });
  it('should get merchant config', function (done) {
    var request = require('supertest');
    request(express)
      .get('/weixin/config/merchant')
      .expect(200)
      .end(function (error, res) {
        assert.equal(true, !error);
        assert.equal(true, res.body.id === '1');
        assert.equal(true, res.body.data.id === 'id');
        assert.equal(true, res.body.data.key === 'key');
        done();
      });
  });

  it('should set message config', function (done) {
    var request = require('supertest');
    request(express)
      .post('/weixin/config/message')
      .send({
        aes: 'aes'
      })
      .expect(200)
      .end(function (error, res) {
        assert.equal(true, !error);
        assert.equal(true, res.body.id === '1');
        assert.equal(true, res.body.data.aes === 'aes');
        done();
      });
  });

  it('should get message config', function (done) {
    var request = require('supertest');
    request(express)
      .get('/weixin/config/message')
      .expect(200)
      .end(function (error, res) {
        assert.equal(true, !error);
        assert.equal(true, res.body.id === '1');
        assert.equal(true, res.body.data.aes === 'aes');
        done();
      });
  });

  it('should set server config', function (done) {
    var request = require('supertest');
    request(express)
      .post('/weixin/config/server')
      .send({
        host: 'localhost',
        prefix: 'weixin'
      })
      .expect(200)
      .end(function (error, res) {
        assert.equal(true, !error);
        assert.equal(true, res.body.id === '1');
        assert.equal(true, res.body.data.host === 'localhost');
        assert.equal(true, res.body.data.prefix === 'weixin');
        done();
      });
  });

  it('should get server config', function (done) {
    var request = require('supertest');
    request(express)
      .get('/weixin/config/server')
      .expect(200)
      .end(function (error, res) {
        assert.equal(true, !error);
        assert.equal(true, res.body.id === '1');
        assert.equal(true, res.body.data.host === 'localhost');
        assert.equal(true, res.body.data.prefix === 'weixin');
        done();
      });
  });

  it('should set urls config', function (done) {
    var request = require('supertest');
    request(express)
      .post('/weixin/config/urls')
      .send({
        url: 'http://localhost/weixin'
      })
      .expect(200)
      .end(function (error, res) {
        assert.equal(true, !error);
        assert.equal(true, res.body.id === '1');
        assert.equal(true, res.body.data !== null);
        assert.equal(true, res.body.data.base.url === 'http://localhost/weixin');
        assert.equal(true, res.body.data.auth.ack === 'http://localhost/weixin' + '/auth/ack');
        assert.equal(true, res.body.data.jssdk.config === 'http://localhost/weixin' + '/jssdk/config');
        assert.equal(true, res.body.data.oauth.access === 'http://localhost/weixin' + '/oauth/access');
        assert.equal(true, res.body.data.oauth.success === 'http://localhost/weixin' + '/oauth/success');
        assert.equal(true, res.body.data.pay.callback === 'http://localhost/weixin' + '/pay/callback');
        done();
      });
  });

  it('should get urls config', function (done) {
    var request = require('supertest');
    request(express)
      .get('/weixin/config/urls')
      .expect(200)
      .end(function (error, res) {
        assert.equal(true, !error);
        assert.equal(true, res.body.id === '1');
        assert.equal(true, res.body.data !== null);
        assert.equal(true, res.body.data.base.url === 'http://localhost/weixin');
        assert.equal(true, res.body.data.auth.ack === 'http://localhost/weixin' + '/auth/ack');
        assert.equal(true, res.body.data.jssdk.config === 'http://localhost/weixin' + '/jssdk/config');
        assert.equal(true, res.body.data.oauth.access === 'http://localhost/weixin' + '/oauth/access');
        assert.equal(true, res.body.data.oauth.success === 'http://localhost/weixin' + '/oauth/success');
        assert.equal(true, res.body.data.pay.callback === 'http://localhost/weixin' + '/pay/callback');
        done();
      });
  });

  it('should set certificate without pfx', function (done) {
    var request = require('supertest');
    request(express)
      .post('/weixin/config/certificate')
      .field('pfxKey', 'key')
      .expect(200)
      .end(function (error, res) {
        // var content = fs.readFileSync(__dirname + '/fixtures/cert.p12');
        assert.equal(true, !error);
        assert.equal(true, res.body.id === '1');
        assert.equal(true, res.body.data !== null);
        assert.equal(true, !res.body.data.pfx);
        assert.equal(true, res.body.data.pfxKey === 'key');
        done();
      });
  });

  it('should set certificate config', function (done) {
    var request = require('supertest');
    request(express)
      .post('/weixin/config/certificate')
      .field('pfxKey', 'key')
      .attach('pfx', __dirname + '/fixtures/cert.p12')
      .expect(200)
      .end(function (error, res) {
        var content = fs.readFileSync(__dirname + '/fixtures/cert.p12');
        assert.equal(true, !error);
        assert.equal(true, res.body.id === '1');
        assert.equal(true, res.body.data !== null);
        assert.equal(true, res.body.data.pfx === content.toString('base64'));
        assert.equal(true, res.body.data.pfxKey === 'key');
        done();
      });
  });

  it('should get certificate config', function (done) {
    var request = require('supertest');
    request(express)
      .get('/weixin/config/certificate')
      .expect(200)
      .end(function (error, res) {
        var content = fs.readFileSync(__dirname + '/fixtures/cert.p12');
        assert.equal(true, !error);
        assert.equal(true, res.body.id === '1');
        assert.equal(true, res.body.data !== null);
        assert.equal(true, res.body.data.pfx === content.toString('base64'));
        assert.equal(true, res.body.data.pfxKey === 'key');
        done();
      });
  });
});
