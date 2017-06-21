const bcrypt = require('bcrypt-nodejs');
const salt = bcrypt.genSaltSync(10);

exports.up = knex => {
  return knex.table('users').insert([
    {
      email: 'owner@mail.com',
      first_name: 'Owner',
      last_name: 'Owner',
      token: '1f2121f36f817bd18540e5fa7de06f59',
      password: bcrypt.hashSync('password', salt),
      position: 'default',
      roles: 'owner',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      email: 'pm@mail.com',
      first_name: 'Pm',
      last_name: 'Pm',
      token: '5109d85d95fece7816d9704e6e5b1279',
      password: bcrypt.hashSync('password', salt),
      position: 'default',
      roles: 'pm',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      email: 'member@mail.com',
      first_name: 'Member',
      last_name: 'Member',
      token: 'aa08769cdcb26674c6706093503ff0a3',
      password: bcrypt.hashSync('password', salt),
      position: 'nodejs',
      roles: 'member',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
};

exports.down = knex => {};
