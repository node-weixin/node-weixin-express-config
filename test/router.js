'use strict';
var bodyParser = require('body-parser');
var assert = require('assert');
var weixinConfigRouter = require('../lib/router');
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

express.use('/weixin/:id', weixinConfigRouter('id', settings, function callback(req, res, id, value) {
  res.json({
    id: id,
    data: value
  });
}));

describe('request', function() {
  it('should set app config', function(done) {
    var request = require('supertest');
    request(express)
      .post('/weixin/1/app')
      .send({
        id: '1',
        token: 'token',
        secret: 'secret'
      })
      .expect(200)
      .end(function(error, res) {
        assert.equal(true, !error);
        assert.equal(true, res.body.id === '1');
        assert.equal(true, res.body.data.id === '1');
        assert.equal(true, res.body.data.secret === 'secret');
        assert.equal(true, res.body.data.token === 'token');
        done();
      });
  });

  it('should get app config', function(done) {
    var request = require('supertest');
    request(express)
      .get('/weixin/1/app')
      .expect(200)
      .end(function(error, res) {
        assert.equal(true, !error);
        assert.equal(true, res.body.id === '1');
        assert.equal(true, res.body.data !== null);
        assert.equal(true, res.body.data.id === '1');
        assert.equal(true, res.body.data.secret === 'secret');
        assert.equal(true, res.body.data.token === 'token');
        done();
      });
  });

  it('should set oauth config', function(done) {
    var request = require('supertest');
    request(express)
      .post('/weixin/1/oauth')
      .send({
        state: 'state',
        scope: 0
      })
      .expect(200)
      .end(function(error, res) {
        assert.equal(true, !error);
        assert.equal(true, res.body.id === '1');
        assert.equal(true, res.body.data.state === 'state');
        assert.equal(true, res.body.data.scope === 0);
        done();
      });
  });

  it('should get oauth config', function(done) {
    var request = require('supertest');
    request(express)
      .get('/weixin/1/oauth')
      .expect(200)
      .end(function(error, res) {
        assert.equal(true, !error);
        assert.equal(true, res.body.id === '1');
        assert.equal(true, res.body.data !== null);
        assert.equal(true, res.body.data.state === 'state');
        assert.equal(true, res.body.data.scope === 0);
        done();
      });
  });


  it('should set merchant config', function(done) {
    var request = require('supertest');
    request(express)
      .post('/weixin/1/merchant')
      .send({
        id: 'id',
        key: 'key'
      })
      .expect(200)
      .end(function(error, res) {
        assert.equal(true, !error);
        assert.equal(true, res.body.id === '1');
        assert.equal(true, res.body.data.id === 'id');
        assert.equal(true, res.body.data.key === 'key');
        done();
      });
  });
  it('should get merchant config', function(done) {
    var request = require('supertest');
    request(express)
      .get('/weixin/1/merchant')
      .expect(200)
      .end(function(error, res) {
        assert.equal(true, !error);
        assert.equal(true, res.body.id === '1');
        assert.equal(true, res.body.data.id === 'id');
        assert.equal(true, res.body.data.key === 'key');
        done();
      });
  });

  it('should set message config', function(done) {
    var request = require('supertest');
    request(express)
      .post('/weixin/1/message')
      .send({
        aes: 'aes'
      })
      .expect(200)
      .end(function(error, res) {
        assert.equal(true, !error);
        assert.equal(true, res.body.id === '1');
        assert.equal(true, res.body.data.aes === 'aes');
        done();
      });
  });

  it('should get message config', function(done) {
    var request = require('supertest');
    request(express)
      .get('/weixin/1/message')
      .expect(200)
      .end(function(error, res) {
        assert.equal(true, !error);
        assert.equal(true, res.body.id === '1');
        assert.equal(true, res.body.data.aes === 'aes');
        done();
      });
  });

  it('should set server config', function(done) {
    var request = require('supertest');
    request(express)
      .post('/weixin/1/server')
      .send({
        host: 'localhost',
        prefix: 'weixin'
      })
      .expect(200)
      .end(function(error, res) {
        assert.equal(true, !error);
        assert.equal(true, res.body.id === '1');
        assert.equal(true, res.body.data.host === 'localhost');
        assert.equal(true, res.body.data.prefix === 'weixin');
        done();
      });
  });

  it('should get server config', function(done) {
    var request = require('supertest');
    request(express)
      .get('/weixin/1/server')
      .expect(200)
      .end(function(error, res) {
        assert.equal(true, !error);
        assert.equal(true, res.body.id === '1');
        assert.equal(true, res.body.data.host === 'localhost');
        assert.equal(true, res.body.data.prefix === 'weixin');
        done();
      });
  });

  it('should set urls config', function(done) {
    var request = require('supertest');
    request(express)
      .post('/weixin/1/urls')
      .send({
        url: 'http://localhost/weixin'
      })
      .expect(200)
      .end(function(error, res) {
        assert.equal(true, !error);
        assert.equal(true, res.body.id === '1');
        assert.equal(true, res.body.data !== null);
        assert.equal(true, res.body.data.auth.ack === 'http://localhost/weixin' + '/auth/ack');
        assert.equal(true, res.body.data.jssdk.config === 'http://localhost/weixin' + '/jssdk/config');
        assert.equal(true, res.body.data.oauth.access === 'http://localhost/weixin' + '/oauth/access');
        assert.equal(true, res.body.data.oauth.success === 'http://localhost/weixin' + '/oauth/success');
        assert.equal(true, res.body.data.pay.callback === 'http://localhost/weixin' + '/pay/callback');
        done();
      });
  });

  it('should get urls config', function(done) {
    var request = require('supertest');
    request(express)
      .get('/weixin/1/urls')
      .expect(200)
      .end(function(error, res) {
        assert.equal(true, !error);
        assert.equal(true, res.body.id === '1');
        assert.equal(true, res.body.data !== null);
        assert.equal(true, res.body.data.auth.ack === 'http://localhost/weixin' + '/auth/ack');
        assert.equal(true, res.body.data.jssdk.config === 'http://localhost/weixin' + '/jssdk/config');
        assert.equal(true, res.body.data.oauth.access === 'http://localhost/weixin' + '/oauth/access');
        assert.equal(true, res.body.data.oauth.success === 'http://localhost/weixin' + '/oauth/success');
        assert.equal(true, res.body.data.pay.callback === 'http://localhost/weixin' + '/pay/callback');
        done();
      });
  });

  it('should set certificate config', function(done) {
    var request = require('supertest');
    request(express)
      .post('/weixin/1/certificate')
      .field('pfxKey', 'key')
      .attach('pfx', __dirname + '/fixtures/cert.p12')
      .expect(200)
      .end(function(error, res) {
        var content = fs.readFileSync(__dirname + '/fixtures/cert.p12');
        assert.equal(true, !error);
        assert.equal(true, res.body.id === '1');
        assert.equal(true, res.body.data !== null);
        assert.equal(true, res.body.data.pfx === content.toString('base64'));
        assert.equal(true, res.body.data.pfxKey === 'key');
        done();
      });
  });

  it('should get certificate config', function(done) {
    var request = require('supertest');
    request(express)
      .get('/weixin/1/certificate')
      .expect(200)
      .end(function(error, res) {
        console.log(res.body);
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
