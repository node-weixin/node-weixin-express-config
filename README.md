# node-weixin-express-config [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> weixin config for expressjs

## Installation

```sh
$ npm install --save node-weixin-express-config
```

## Usage

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

nodeWeixinExpressConfig('Rainbow');
```
## License

MIT © [node-weixin](blog.3gcnbeta.com)


[npm-image]: https://badge.fury.io/js/node-weixin-express-config.svg
[npm-url]: https://npmjs.org/package/node-weixin-express-config
[travis-image]: https://travis-ci.org/node-weixin/node-weixin-express-config.svg?branch=master
[travis-url]: https://travis-ci.org/node-weixin/node-weixin-express-config
[daviddm-image]: https://david-dm.org/node-weixin/node-weixin-express-config.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/node-weixin/node-weixin-express-config
[coveralls-image]: https://coveralls.io/repos/node-weixin/node-weixin-express-config/badge.svg
[coveralls-url]: https://coveralls.io/r/node-weixin/node-weixin-express-config
