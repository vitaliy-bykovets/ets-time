exports.up = knex => {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string('email', 100).notNullable().index();
    table.string('first_name', 100).notNullable().comment('First Name');
    table.string('last_name', 100).notNullable().comment('Last Name');
    table.string('token', 32).comment('For Authorization from frontend').index();
    table.string('password', 100).notNullable();
    table.integer('user_type').default(1).notNullable().comment('backend, pm, fed, etc.');
    table.decimal('rate', 6, 2).default(0).comment('Price Rate in $');
    table.boolean('locked').default(false).comment('if user banned');
    table.timestamps();
  });
};

exports.down = knex => knex.schema.dropTableIfExists('users');
