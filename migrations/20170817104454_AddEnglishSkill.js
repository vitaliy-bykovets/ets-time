exports.up = knex => {
  return knex.table('skills').insert([
    {
      parent_id: null,
      name: 'NodeJS',
      desc: null
    },
    {
      parent_id: null,
      name: 'Python',
      desc: null
    },
    {
      parent_id: null,
      name: 'Android',
      desc: null
    },
    {
      parent_id: null,
      name: 'Databases',
      desc: null
    },
    {
      parent_id: null,
      name: 'QA',
      desc: null
    }
  ]);
};

exports.down = knex => {
  return new Promise();
};
