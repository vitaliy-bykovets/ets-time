const bcrypt = require('bcrypt-nodejs');
const salt = bcrypt.genSaltSync(10);

exports.up = knex => {
  return knex.table('users').insert({
    email: 'owner@mail.com',
    first_name: 'Admin',
    last_name: 'Admin',
    token: 1,
    password: bcrypt.hashSync('password', salt),
    position: 'default',
    roles: 'owner,pm',
    created_at: new Date(),
    updated_at: new Date()
  });
};

exports.down = knex => {};
