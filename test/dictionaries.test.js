const assert = require('assert');
const { auth } = require('./../app/controllers');
const app = require('./../app');
const agent = require('supertest').agent(app);
const knex = require('../app/libs/knex');
const jwt = require('jsonwebtoken');
const env = require('./../app/config');
const async = require('async');

let urls = {
  dict: '/api/v1/dictionaries'
};

let token_owner = null;

async.parallel(
  {
    owner: cb => {
      knex('users as u').select('u.id').where('u.roles', 'owner').first().asCallback(cb);
    }
  },
  (err, results) => {
    if (err) return next(err);
    token_owner = jwt.sign({ id: results.owner.id }, env.secret, { expiresIn: '120d' });
  }
);

describe('dictionaries tests', () => {
  before(done => {
    knex.migrate
      .rollback()
      .then(() => {
        knex.migrate
          .latest()
          .then(() => {
            done();
          })
          .catch(err => {
            done(err);
          });
      })
      .catch(err => {
        done(err);
      });
  });

  it('get dictionaries', done => {
    agent.get(urls.dict).set('authorization', token_owner).end((err, res) => {
      assert.equal(null, err);
      assert.equal(200, res.statusCode, 'status code must be 200');
      done();
    });
  });
});
