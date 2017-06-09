'use strict';
let env = require('./../.configure');
let knex = require('knex')(env.db);
let bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');

module.exports.knex = knex;
module.exports = bookshelf;
