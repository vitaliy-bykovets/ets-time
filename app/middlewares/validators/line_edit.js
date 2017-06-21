const Validator = require('./Validator');
const env = require('./../../config');
const knex = require('./../../libs/knex');
const _ = require('lodash');

module.exports = (req, res, next) => {
  const rules = {
    id: 'required|integer|min:0',
    project: 'required|min:2',
    task: 'required|min:3',
    type_work: 'required|in:' + env.type_works.join(','),
    hours: 'required|integer|min:0',
    date_task: 'required|regex:/^\\d{4}-\\d{2}-\\d{2}$/|date'
  };
  const validate = new Validator(req.body, rules);
  if (validate.fails()) {
    res.status(400).send(validate.errors);
  } else {
    knex('track_lines')
      .where({ id: req.body.id, user_id: req._user.id })
      .first()
      .count('* as c')
      .then(count => {
        if (count.c) {
          let vars = _.pick(req.body, ['project', 'task', 'type_work', 'hours', 'date_task']);
          vars.updated_at = new Date();
          vars.status = 'Open';
          req._vars = vars;
          next();
        } else {
          res.status(204).send();
        }
      })
      .catch(() => res.status(500).send());
  }
};
