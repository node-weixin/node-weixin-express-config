
'use strict';
/* eslint space-before-function-paren: 0 */

var router = require('./router');

module.exports = {
  getHandler: function(id, settings, callback, getId) {
    return router(id, settings, callback, getId);
  },
  setHandler: function(r, handler, url) {
    r.get(url, handler.__handlers.get);
    r.post(url, handler.__handlers.post);
  },
  set: function(settings, app, callback, getId, id, url) {
    var handler = this.getHandler(id, settings, callback, getId);
    this.setHandler(app, handler, url);
  }
};
