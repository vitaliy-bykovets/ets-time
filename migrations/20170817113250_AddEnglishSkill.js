exports.up = knex => {
  return knex.table('skills').insert([
    {
      parent_id: null,
      name: 'English',
      desc: null
    }
  ]);
};
exports.down = knex => {
  return new Promise();
};
