'use strict';
let Ctrls = require('./Controllers');
let mw = require('./Middlewares');
let router = require('koa-router')();

const Routes = app => {
  router.get('/', Ctrls.Index.index);
  router.get('/api/v1/lines', Ctrls.Lines.index);
  router.post('/api/v1/lines', mw.auth, mw.validatorLineCreate, Ctrls.Lines.create);

  app.use(router.routes());
};

module.exports = Routes;
