const Validator = require('validatorjs');

Validator.register(
  'my_date',
  function(value, requirement, attribute) {
    // requirement parameter defaults to null
    return value.toString().match(/^\d{4}-\d{2}-\d{2}$/);
  },
  'The :attribute is not in the format XXXX-XX-XXX.'
);

module.exports = Validator;
