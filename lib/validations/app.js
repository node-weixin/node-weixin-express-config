'use strict';
module.exports = {
  id: {
    type: 'string',
    maxLength: 32,
    required: true
  },
  secret: {
    type: 'string',
    maxLength: 32,
    required: true
  },
  token: {
    type: 'string',
    maxLength: 32,
    required: true
  }
};
