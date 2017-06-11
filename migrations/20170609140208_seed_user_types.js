exports.up = knex => {
  return knex.table('types').insert([{ type: 'owner' }, { type: 'pm' }, { type: 'member' }, { type: 'guest' }]);
};

exports.down = knex => {};
