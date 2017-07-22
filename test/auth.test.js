const assert = require('assert');
const { auth } = require('./../app/controllers');
const app = require('./../app');
const agent = require('supertest').agent(app);
const knex = require('../app/libs/knex');
const jwt = require('jsonwebtoken');
const env = require('./../app/config');
const async = require('async');

const urls = {
  auth: '/api/v1/auth',
  me: '/api/v1/auth/me'
};

let token_owner = jwt.sign({ id: 1 }, env.secret);
let token_member = jwt.sign({ id: 2 }, env.secret);

describe('Authorize controller', () => {
  before(done => {
    require('./TestCase')(knex, done);
  });

  it('auth', done => {
    agent
      .post(urls.auth)
      .send({
        email: 'owner@mail.com',
        password: 'password'
      })
      .end((err, res) => {
        assert.equal(200, res.statusCode);
        assert.notEqual(null, res.body.token);
        assert.equal('owner@mail.com', res.body.email);
        done();
      });
  });

  it('auth (email that not exist)', done => {
    agent
      .post(urls.auth)
      .send({
        email: 'notexist@mail.com',
        password: 'password'
      })
      .expect(400, done);
  });

  it('auth (without email)', done => {
    agent
      .post(urls.auth)
      .send({
        password: 'password'
      })
      .expect(400, done);
  });

  it('auth (without password)', done => {
    agent
      .post(urls.auth)
      .send({
        email: 'owner@mail.com'
      })
      .expect(400, done);
  });

  it('auth (invalid email)', done => {
    agent
      .post(urls.auth)
      .send({
        email: 'email',
        password: 'password'
      })
      .expect(400, done);
  });

  it('auth (short password)', done => {
    agent
      .post(urls.auth)
      .send({
        email: 'owner@mail.com',
        password: 'pass'
      })
      .expect(400, done);
  });

  it('auth (locked user)', done => {
    agent
      .post(urls.auth)
      .send({
        email: 'locked@tmail.com',
        password: 'password'
      })
      .expect(401, done);
  });

  it('auth (right email and not right password)', done => {
    agent
      .post(urls.auth)
      .send({
        email: 'owner@mail.com',
        password: 'incorrectpassword'
      })
      .expect(401, done);
  });

  it('me', done => {
    agent.get(urls.me).set('authorization', token_owner).end((err, res) => {
      assert.equal(200, res.statusCode);
      assert.equal(1, res.body.id);
      done();
    });
  });

  it('me (without token)', done => {
    agent.get(urls.me).expect(401, done);
  });

  it('me (with invalid token)', done => {
    agent.get(urls.me).set('authorization', 'invalid_token').expect(401, done);
  });
});
