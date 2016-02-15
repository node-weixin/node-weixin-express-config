'use strict';
module.exports = {
  host: {
    type: 'url',
    maxLength: 64,
    required: true
  },
  prefix: {
    type: 'string',
    maxLength: 32,
    required: true
  }
};
