const lines = require('./controllers/lines');

module.exports = app => {
  app.use('/api/v1/lines', lines);
};
