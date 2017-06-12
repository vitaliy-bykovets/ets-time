const c = require('./controllers/index');

module.exports = app => {
  app.use('/api/v1/lines', c.lines);
  app.use('/api/v1/dictionaries', c.dictionaries);
};
