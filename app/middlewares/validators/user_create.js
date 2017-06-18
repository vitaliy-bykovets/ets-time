const Validator = require('./Validator');
const env = require('./../../config');
const bcrypt = require('bcrypt-nodejs');
const salt = bcrypt.genSaltSync(10);

module.exports = (req, res, next) => {
  const rules = {
    first_name: 'required|min:2',
    last_name: 'required|min:2',
    email: 'required|email|unique',
    position: 'required|array|in:' + env.positions.join(','),
    roles: 'required|array|in:' + env.roles.join(','),
    rate: 'required|numeric|min:0',
    password: 'required|alpha_num|min:5'
  };
  const validate = new Validator(req.body, rules);

  validate.passes(() => {
    req.body.password = 1;
    req.body.roles = req.body.roles.join(',');
    req.body.position = req.body.position.join(',');
    req.body.created_at = new Date();
    req.body.updated_at = new Date();
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    next();
  });
  validate.fails(() => {
    return res.status(400).send(validate.errors);
  });
};
