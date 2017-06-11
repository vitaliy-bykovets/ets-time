'use strict';
const env = require('./../../../.configure');

const { pick } = require('lodash');
const Validator = require('./Validator');

const LineCreateMiddleware = (ctx, next) => {
  const rules = {
    project: 'required|min:2',
    task: 'required|min:3',
    type_work: 'required|in:' + env.type_works.join(','),
    hours: 'required|integer|min:0',
    date_task: 'required|my_date'
  };
  const validate = new Validator(ctx.request.body, rules);
  if (validate.fails()) {
    ctx.status = 400;
    ctx.body = validate.errors;
  } else {
    ctx._body = pick(ctx.request.body, ['date_task', 'hours', 'status', 'type_work', 'task', 'project']);
    next();
  }
};
module.exports = LineCreateMiddleware;
