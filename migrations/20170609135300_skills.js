exports.up = knex => {
  return knex.schema.createTable('skills', table => {
    table.increments();
    table.integer('parent_id').index().notNullable().default(0);
    table.string('name', 100).notNullable();
  });
};

exports.down = knex => knex.schema.dropTableIfExists('skills');
