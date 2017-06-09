'use strict';
const koa_body = require('koa-body');

const Bootstrap = async app => {
  app.context.env = require('./../.configure');
  app.context.knex = require('./bookshelf').knex;
  app.context.db = {};

  // attach midlewares
  app.use(koa_body());

  // read and add models to context
  require('fs').readdirSync(__dirname + '/Models').filter(file => file.indexOf('.') !== 0).forEach(file => {
    let model = file.split('.');
    app.context.db[model[0]] = require('./Models/' + file);
  });

  require('./routes')(app);
};
module.exports = Bootstrap;
