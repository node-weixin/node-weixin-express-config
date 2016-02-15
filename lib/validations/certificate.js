'use strict';
module.exports = {
  pfxKey: {
    type: 'string',
    maxLength: 64,
    required: true
  },
  pfxBase64: {
    type: 'text',
    required: true
  }
};
