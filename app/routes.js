const c = require('./controllers/index');

const noCache = (req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
};

module.exports = app => {
  app.use('/api/v1/auth', noCache, c.auth);
  app.use('/api/v1/lines', noCache, c.lines);
  app.use('/api/v1/users', noCache, c.users);
  app.use('/api/v1/dictionaries', noCache, c.dictionaries);
};
