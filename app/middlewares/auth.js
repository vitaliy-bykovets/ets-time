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
    res.status(401).send(validate.errors);
  } else {
    knex('tokens as t')
      .select('u.*', 't.token')
      .where('t.token', req.header('authorization'))
      .join('users as u', 'u.id', 't.user_id')
      .first()
      .then(user => {
        if (user) {
          let _user = _.omit(user, ['password']);
          _user.roles = _user.roles.split(',');
          _user.position = _user.position.split(',');
          req._user = _user;
          // update timestamp
          knex('tokens')
            .where('user_id', user.id)
            .where('token', user.token)
            .update({ created_at: new Date() })
            .then(next())
            .catch(next);
        } else {
          res.status(401).send();
        }
      })
      .catch(() => res.status(500).send());
  }
};
