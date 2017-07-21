const bcrypt = require('bcrypt-nodejs');
const salt = bcrypt.genSaltSync(10);

exports.up = knex => {
  if (process.env.NODE_ENV === 'testing') {
    return knex.table('users').insert([
      {
        email: 'testowner@mail.com',
        first_name: 'Smith',
        last_name: 'Johnson',
        password: bcrypt.hashSync('password', salt),
        position: 'default',
        roles: 'owner',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        email: 'testpm@mail.com',
        first_name: 'John',
        last_name: 'Miller',
        password: bcrypt.hashSync('password', salt),
        position: 'default',
        roles: 'pm',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        email: 'testmember@mail.com',
        first_name: 'Davis',
        last_name: 'Garcia',
        password: bcrypt.hashSync('password', salt),
        position: 'nodejs',
        roles: 'member',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        email: 'testownerpm@mail.com',
        first_name: 'Wilson',
        last_name: 'Martinez',
        password: bcrypt.hashSync('password', salt),
        position: 'default',
        roles: 'owner,pm',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        email: 'testmemberpm@mail.com',
        first_name: 'Harris',
        last_name: 'Clark',
        password: bcrypt.hashSync('password', salt),
        position: 'default',
        roles: 'member,pm',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        email: 'testownermember@mail.com',
        first_name: 'Scott',
        last_name: 'Allen',
        password: bcrypt.hashSync('password', salt),
        position: 'default',
        roles: 'owner,member',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        email: 'testlockedr@mail.com',
        first_name: 'Kevin',
        last_name: 'Johnson',
        password: bcrypt.hashSync('password', salt),
        position: 'php',
        locked: 1,
        roles: 'member',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  }
};

exports.down = (knex, Promise) => {};
