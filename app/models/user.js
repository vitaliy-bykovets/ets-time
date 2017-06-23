'use strict';

const knex = require('./../libs/knex');
const _ = require('lodash');

module.exports = {
  getUserByToken: (token, cb) => {
    knex('tokens as t')
      .select('u.*', 't.token')
      .where('t.token', token)
      .join('users as u', 'u.id', 't.user_id')
      .first()
      .then(user => {
        if (user) {
          let _user = _.omit(user, ['password']);
          _user.roles = _user.roles.split(',');
          _user.position = _user.position.split(',');
          cb(null, _user);
        } else {
          cb(true);
        }
      })
      .catch(cb);
  }
};
