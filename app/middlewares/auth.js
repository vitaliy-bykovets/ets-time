const Validator = require('./validators/Validator');
const knex = require('./../libs/knex');
const _ = require('lodash');

module.exports = (req, res, next) => {
  const rules = {
    authorization: 'required|size:32'
  };
  const validate = new Validator(req.headers, rules, {
    'required.authorization': 'The authorization header is required',
    'size.authorization': 'The authorization header is invalid'
  });

  if (validate.fails()) {
    res.status(400).send(validate.errors);
  } else {
    knex('users')
      .where('token', req.header('authorization'))
      .first()
      .then(user => {
        if (user) {
          let _user = _.omit(user, ['password']);
          _user.roles = _user.roles.split(',');
          _user.position = _user.position.split(',');
          req._user = _user;
          next();
        } else {
          res.status(401).send();
        }
      })
      .catch(e => res.status(500).send());
  }
};
