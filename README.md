# node-weixin-express-config [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> weixin config for expressjs

## Installation

```sh
$ npm install --save node-weixin-express-config
```

## Usage


### 初始化
```js
var nodeWeixinExpressConfig = require('node-weixin-express-config');
var settings = require('node-weixin-settings');
var express = require('express')();

express.use(require('skipper')());    //必须有，用于上传p12文件

express.use(bodyParser.urlencoded({
  extended: false
}));
express.use(bodyParser.json());
express.use(bodyParser.raw({
  type: 'text/xml'
}));
```


### 直接使用set的方法 

```js
nodeWeixinExpressConfig.set(
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

```


### 路由部分使用方法

```js
var weixinConfigRouter = nodeWeixinExpressConfig.router;
var handler = weixinConfigRouter(
  //获取数据识别ID的参数名
  'id',
  //node-weixin-settings对象
  settings,
  //数据处理完成后的回调函数
  //ID是保存数据唯一识别号，可以自己定义
  //value是所获取或者保存的数据
  function callback(req, res, id, value) {
  res.json({
    id: id,
    data: value
  });
});

express.use('/weixin/:id', handler);
express.get('/weixin/:id/:type', handler.__handlers.get);
express.post('/weixin/:id/:type', handler.__handlers.post);
```

### 配置导入的使用方法
```js
var parser = nodeWeixinExpressConfig.parser;
var file = path.resolve(__dirname, './fixtures/config.json');
var cb = function (json) {
  //json是文件里的JSON配置信息
}
//
//id  用于识别存储的数据
//settings 是node-weixin-settings
//file json文件
//cb 回调函数
parser(id, settings, file, cb);

```
## License

Apache-2.0 © [node-weixin](www.node-weixin.com)


[npm-image]: https://badge.fury.io/js/node-weixin-express-config.svg
[npm-url]: https://npmjs.org/package/node-weixin-express-config
[travis-image]: https://travis-ci.org/node-weixin/node-weixin-express-config.svg?branch=master
[travis-url]: https://travis-ci.org/node-weixin/node-weixin-express-config
[daviddm-image]: https://david-dm.org/node-weixin/node-weixin-express-config.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/node-weixin/node-weixin-express-config
[coveralls-image]: https://coveralls.io/repos/node-weixin/node-weixin-express-config/badge.svg
[coveralls-url]: https://coveralls.io/r/node-weixin/node-weixin-express-config
