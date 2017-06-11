exports.up = knex => knex.table('user_types').insert([{ user_id: 1, type_id: 1 }, { user_id: 1, type_id: 2 }]);
exports.down = knex => {};
