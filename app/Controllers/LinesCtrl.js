'use strict';

const Validator = require('validatorjs');

const IndexCtrl = {
  index: ctx => {
    ctx.body = { lines: [{ 1: 2 }] };
  },

  // Create track lines
  create: ctx => {
    let rules = {
      project: 'required|max:2',
      hours: 'required|min:20'
    };

    let validation = new Validator(ctx.request.body, rules);
    if (validation.fails()) {
      ctx.status = 400;
      ctx.body = validation.errors;
    } else {
      ctx.statusCode = 200;
    }
  }
};
module.exports = IndexCtrl;
