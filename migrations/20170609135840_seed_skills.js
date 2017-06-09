exports.up = knex => {
  return knex.table('skills').insert([
    {
      parent_id: 0,
      name: 'PHP'
    },
    {
      parent_id: 0,
      name: 'iOS'
    },
    {
      parent_id: 0,
      name: 'FeD'
    },
    {
      parent_id: 1,
      name: 'Docker'
    },
    {
      parent_id: 1,
      name: 'Composer'
    },
    {
      parent_id: 1,
      name: 'Symfony'
    },
    {
      parent_id: 1,
      name: 'Laravel'
    },
    {
      parent_id: 1,
      name: 'Wordpress'
    },
    {
      parent_id: 1,
      name: 'Code Igniter'
    }
  ]);
};

exports.down = knex => {};
