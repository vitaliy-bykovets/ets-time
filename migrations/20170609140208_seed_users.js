const bcrypt = require('bcrypt');
const saltRound = 10;
const salt = bcrypt.genSaltSync(saltRound);

exports.up = knex => {
  return knex.table('users').insert({
    email: 'owner@mail.com',
    first_name: 'Admin',
    last_name: 'Admin',
    token: 1,
    password: bcrypt.hashSync('password', salt),
    user_type: 1
  });
};

exports.down = knex => {};
