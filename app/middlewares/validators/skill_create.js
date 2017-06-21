const Validator = require('./Validator');
const _ = require('lodash');

module.exports = (req, res, next) => {
  const rules = {
    name: 'required|min:2',
    desc: 'min:5',
    parent_id: 'required|min:0|exist_skill'
  };

  const validate = new Validator(req.body, rules);

  validate.passes(() => {
    let vars = _.pick(req.body, ['name', 'parent_id']);
    if (req.body.desc) {
      vars['desc'] = req.body.desc;
    }
    req._vars = vars;
    next();
  });
  validate.fails(() => res.status(400).send(validate.errors));
};
