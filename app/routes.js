const lines = require('./controllers/lines');
const dictionaries = require('./controllers/dictionaries');

module.exports = app => {
  app.use('/api/v1/lines', lines);
  app.use('/api/v1/dictionaries', dictionaries);
};
