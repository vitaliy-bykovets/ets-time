exports.up = knex => {
  return knex.schema.createTable('types', table => {
    table.increments();
    table.string('type', 100).notNullable();
  });
};

exports.down = knex => knex.schema.dropTableIfExists('types');
