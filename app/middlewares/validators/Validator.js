const Validator = require('validatorjs');
const knex = require('./../../libs/knex');

// add custom validate rules here

/**
 * Get unique email from users
 */
Validator.registerAsync('unique', (email, attribute, req, passes) => {
  knex('users')
    .where('email', email)
    .first()
    .count('* as c')
    .then(count => {
      passes(!count.c, 'This email has already been taken.');
    })
    .catch(() => {
      passes(false, 'Error in Validator.js:19');
    });
});

/**
 * Get exist user
 */
Validator.registerAsync('user_exist', (user_id, attribute, req, passes) => {
  knex('users')
    .where('id', user_id)
    .first()
    .count('* as c')
    .then(count => {
      passes(count.c === 1, 'User not found');
    })
    .catch(() => {
      passes(false, 'Error in Validator.js:34');
    });
});

module.exports = Validator;
