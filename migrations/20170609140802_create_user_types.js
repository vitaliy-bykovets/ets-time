exports.up = knex => {
  return knex.schema.createTable('user_types', table => {
    table.increments();
    table.integer('user_id').unsigned().index();
    table.integer('type_id').unsigned().index();
    table.unique(['user_id', 'type_id']);
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
    table.foreign('type_id').references('types.id').onDelete('CASCADE');
    table.collate('utf8_general_ci');
  });
};

exports.down = knex => knex.schema.dropTableIfExists('user_types');
