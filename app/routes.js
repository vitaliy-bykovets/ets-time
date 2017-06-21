const c = require('./controllers/index');
const { role, auth, no_cache } = require('./middlewares');

module.exports = app => {
  app.use('/api/v1/auth', no_cache, c.auth);
  app.use('/api/v1/lines', no_cache, auth, c.lines);
  app.use('/api/v1/users', no_cache, auth, role(['owner', 'pm']), c.users);
  app.use('/api/v1/dictionaries', no_cache, auth, c.dictionaries);

  // skills
  app.use('/api/v1/skills', no_cache, c.skills);
};
