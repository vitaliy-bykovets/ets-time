const {
  auth: authCtrl,
  users: usersCtrl,
  skills: skillsCtrl,
  lines: linesCtrl,
  dictionaries: dictionariesCtrl
} = require('./controllers/index');
const { role, auth, no_cache: nc } = require('./middlewares');

module.exports = app => {
  app.use('/api/v1/auth', nc, authCtrl);
  app.use('/api/v1/lines', nc, auth, linesCtrl);
  app.use('/api/v1/users', nc, auth, role(['owner', 'pm']), usersCtrl);
  app.use('/api/v1/dictionaries', nc, auth, dictionariesCtrl);

  // skills
  app.use('/api/v1/skills', nc, skillsCtrl);
};
