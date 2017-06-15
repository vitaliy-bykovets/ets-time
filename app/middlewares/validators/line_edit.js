const Validator = require('./Validator');
const env = require('./../../config');
const knex = require('./../../libs/knex');

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
    // TODO change default user id to user from request by token
    knex('track_lines')
      .where({ id: req.body.id, user_id: 1 })
      .first()
      .count('* as c')
      .then(count => {
        if (count.c) {
          next();
        } else {
          res.status(404).send();
        }
      })
      .catch(() => {
        res.status(500).send();
      });
  }
};
