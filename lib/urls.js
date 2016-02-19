'use strict';
module.exports = function generate(baseUrl) {
  return {
    base: {
      url: baseUrl
    },
    auth: {
      //微信Ack服务器响应地址
      ack: baseUrl + '/auth/ack'
    },
    jssdk: {
      //JSSDK的配置数据请求地址
      config: baseUrl + '/jssdk/config'
    },
    oauth: {
      //OAuth初始化地址
      access: baseUrl + '/oauth/access',
      //OAuth成功返回地址
      success: baseUrl + '/oauth/success'
    },
    pay: {
      //支付回调地址
      callback: baseUrl + '/pay/callback'
    }
  };
};
