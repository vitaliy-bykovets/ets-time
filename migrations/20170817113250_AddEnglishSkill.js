exports.up = knex => {
  return knex.table('skills').insert([
    {
      parent_id: null,
      name: 'English',
      desc: null
    }
  ]);
};
exports.down = knex => knex('users').count('* as c');
