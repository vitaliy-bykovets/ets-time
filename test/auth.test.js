const assert = require('assert');
const { auth } = require('./../app/controllers');
const app = require('./../app');
const agent = require('supertest').agent(app);
const knex = require('../app/libs/knex');
const jwt = require('jsonwebtoken');
const env = require('./../app/config');
const async = require('async');

let urls = {
  auth: '/api/v1/auth',
  me: '/api/v1/auth/me'
};

let token_owner = null;
let token_member = null;
let invalid_token = jwt.sign({ id: 10000 }, 'invalid secret', { expiresIn: '120d' });

async.parallel(
  {
    owner: cb => {
      knex('users as u').select('u.id').where('u.roles', 'owner').first().asCallback(cb);
    },
    member: cb => {
      knex('users as u').select('u.id').where('u.roles', 'member').first().asCallback(cb);
    }
  },
  (err, results) => {
    if (err) return next(err);
    token_owner = jwt.sign({ id: results.owner.id }, env.secret, { expiresIn: '120d' });
    token_member = jwt.sign({ id: results.member.id }, env.secret, { expiresIn: '120d' });
  }
);

describe('auth tests', () => {
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

  it('auth correct', done => {
    agent
      .post(urls.auth)
      .send({
        email: 'testowner@mail.com',
        password: 'password'
      })
      .end((err, res) => {
        assert.equal(null, err);
        assert.equal(200, res.statusCode, 'status code must be 200');
        assert.notEqual(null, res.body.token, 'token can`t be empty');
        assert.equal('testowner@mail.com', res.body.email, 'user email must be testowner@mail.com');
        done();
      });
  });

  it('auth with email that not exist', done => {
    agent
      .post(urls.auth)
      .send({
        email: 'notexist@mail.com',
        password: 'password'
      })
      .end((err, res) => {
        assert.equal(null, err);
        assert.equal(400, res.statusCode, 'status code must be 400');
        done();
      });
  });

  it('auth without email', done => {
    agent
      .post(urls.auth)
      .send({
        password: 'password'
      })
      .end((err, res) => {
        assert.equal(null, err);
        assert.equal(400, res.statusCode, 'status code must be 400');
        done();
      });
  });

  it('auth with invalid email', done => {
    agent
      .post(urls.auth)
      .send({
        email: 'email',
        password: 'password'
      })
      .end((err, res) => {
        assert.equal(null, err);
        assert.equal(400, res.statusCode, 'status code must be 400');
        done();
      });
  });

  it('auth without password', done => {
    agent
      .post(urls.auth)
      .send({
        email: 'testowner@mail.com'
      })
      .end((err, res) => {
        assert.equal(null, err);
        assert.equal(400, res.statusCode, 'status code must be 400');
        done();
      });
  });

  it('auth with short password', done => {
    agent
      .post(urls.auth)
      .send({
        email: 'testowner@mail.com',
        password: 'pass'
      })
      .end((err, res) => {
        assert.equal(null, err);
        assert.equal(400, res.statusCode, 'status code must be 400');
        done();
      });
  });

  it('auth as locked user', done => {
    agent
      .post(urls.auth)
      .send({
        email: 'testlockedr@mail.com',
        password: 'password'
      })
      .end((err, res) => {
        assert.equal(null, err);
        assert.equal(401, res.statusCode, 'status code must be 401');
        done();
      });
  });

  it('auth with right email and not right password', done => {
    agent
      .post(urls.auth)
      .send({
        email: 'testowner@mail.com',
        password: 'incorrectpassword'
      })
      .end((err, res) => {
        assert.equal(null, err);
        assert.equal(401, res.statusCode, 'status code must be 401');
        done();
      });
  });

  it('get me', done => {
    agent.get(urls.me).set('authorization', token_owner).end((err, res) => {
      assert.equal(null, err);
      assert.notEqual(null, res.body);
      assert.equal(200, res.statusCode, 'status code must be 200');
      done();
    });
  });

  it('get me without token', done => {
    agent.get(urls.me).end((err, res) => {
      assert.equal(null, err);
      assert.equal(401, res.statusCode, 'status code must be 401');
      done();
    });
  });

  it('get me with invalid token', done => {
    agent.get(urls.me).set('authorization', invalid_token).end((err, res) => {
      assert.equal(null, err);
      assert.equal(401, res.statusCode, 'status code must be 401');
      done();
    });
  });
});
