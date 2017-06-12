'use strict';

let bookshelf = require(__dirname + '/../libs/Db');

let Line = bookshelf.Model.extend({
  tableName: 'track_lines',
  hasTimestamps: true
});

module.exports = bookshelf.model('Line', Line);
