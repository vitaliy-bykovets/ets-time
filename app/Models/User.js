'use strict';
let bookshelf = require('./../bookshelf');

let User = bookshelf.Model.extend({
  tableName: 'users'
});

module.exports = bookshelf.model('User', User);
