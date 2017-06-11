exports.up = knex => {
  return knex.schema.createTable('track_lines', table => {
    table.increments();
    table.integer('user_id').unsigned().index();
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
    table.string('project').notNullable().comment('Project name');
    table.string('task').notNullable().comment('Description of task');
    table.string('type_work', 50).notNullable().comment('Type of Work');
    table.enum('status', ['Accepted', 'Declined', 'Open']).notNullable().default('Open').comment('Status task');
    table.integer('hours', 4).default(0).comment('Spent hours');
    table.date('date_task');
    table.timestamps();
  });
};

exports.down = knex => knex.schema.dropTableIfExists('track_lines');
