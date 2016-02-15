'use strict';
module.exports = function generate(baseUrl, prefix) {
  return {
    auth: {
      //微信Ack服务器响应地址
      ack: baseUrl + prefix + '/auth/ack'
    },
    jssdk: {
      //JSSDK的配置数据请求地址
      config: baseUrl + prefix + '/jssdk/config'
    },
    oauth: {
      //OAuth初始化地址
      access: baseUrl + prefix + '/oauth/access',
      //OAuth成功返回地址
      success: baseUrl + prefix + '/oauth/success'
    },
    pay: {
      //支付回调地址
      callback: baseUrl + prefix + '/pay/callback'
    }
  };
};
