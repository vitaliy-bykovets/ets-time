'use strict';
const Koa = require('koa');
const app = new Koa();

require('./app/bootstrap')(app);

if (!module.parent) {
  app.listen(app.context.env.port, () => console.log('App lifted, visit http://localhost:' + app.context.env.port));
}
module.exports = app;
