'use strict';
module.exports = function getStorage(settings) {

  var keys = ['app', 'oauth', 'merchant', 'message', 'server', 'certificate'];

  return {
    get: function (id, key, next) {
      if (keys.indexOf(key) === -1) {
        throw new Error('Key Is Invalid!');
      }
      settings.get(id, key, next);
    },
    set: function (id, key, value, next) {
      if (keys.indexOf(key) === -1) {
        throw new Error('Key is invalid!');
      }
      settings.set(id, key, value, next);
    }
  };
};
