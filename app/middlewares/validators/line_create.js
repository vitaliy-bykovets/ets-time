const Validator = require('./Validator');
const env = require('./../../config');

module.exports = (req, res, next) => {
  const rules = {
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
    next();
  }
};
