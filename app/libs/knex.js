'use strict';
let env = require('./../config');
let knex = require('knex')(env.db);

module.exports = knex;
