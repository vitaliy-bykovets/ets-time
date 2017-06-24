'use strict';
const Validator = require('./validators/Validator');
const knex = require('./../libs/knex');
const _ = require('lodash');
const userModel = require('./../models/user');

module.exports = (req, res, next) => {
  const rules = {
    authorization: 'required|size:32'
  };
  const validate = new Validator(req.headers, rules, {
    'required.authorization': 'The authorization header is required',
    'size.authorization': 'The authorization header is invalid'
  });

  if (validate.fails()) {
    res.status(401).send(validate.errors);
  } else {
    let futureDate = new Date();
    futureDate.setDate(futureDate.getDate() - 180);

    // remove old tokens
    knex('tokens').where('created_at', '<', futureDate).del().then(() => {}).catch(() => {});

    // login
    userModel.getUserByToken(req.header('authorization'), (err, user) => {
      if (err) return res.status(401).end();
      if (user) {
        knex('tokens')
          .where('user_id', user.id)
          .where('token', user.token)
          .update({ created_at: new Date() })
          .then(() => {
            req._user = user;
            next();
          })
          .catch(next);
      }
    });
  }
};
