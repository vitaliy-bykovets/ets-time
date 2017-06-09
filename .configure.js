let config = {
  port: 3000,
  db: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '1',
      database: 'ets',
      port: '3306'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
switch (process.env.NODE_ENV) {
  case 'production':
    break;
  default:
    break;
}
module.exports = config;
