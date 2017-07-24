const assert = require('assert');
const app = require('./../app');
const agent = require('supertest').agent(app);
const knex = require('../app/libs/knex');
const jwt = require('jsonwebtoken');
const env = require('./../app/config');
const async = require('async');

const urls = {
  skills: '/api/v1/skills'
};

let token_owner = jwt.sign({ id: 1 }, env.secret);
let token_member = jwt.sign({ id: 3 }, env.secret);

const createCredentials = [
  [
    {
      name: 'Test skill'
    },
    400,
    'Parent id not exist'
  ],
  [
    {
      parent_id: 0,
      name: 'Test skill'
    },
    400,
    'Parent id must be min 1'
  ],
  [
    {
      parent_id: 100,
      name: 'Test skill'
    },
    400,
    'Parent id not found'
  ],
  [
    {
      parent_id: 1
    },
    400,
    'Name not exist'
  ],
  [
    {
      parent_id: 1,
      name: 'n'
    },
    400,
    'Name must be at least 2 characters'
  ],
  [
    {
      parent_id: 1,
      name: 'Test skill',
      desc: 'desc'
    },
    400,
    'Desc must be at least 5 characters'
  ]
];

describe('Skill controller', () => {
  before(done => {
    require('./TestCase')(knex, done);
  });

  it('list', done => {
    agent.get(urls.skills).set('authorization', token_owner).end((err, res) => {
      assert.notEqual(null, res.body);
      assert.equal(200, res.statusCode);
      done();
    });
  });

  it('list (without token)', done => {
    agent.get(urls.skills).expect(401, done);
  });

  it('list (as member)', done => {
    agent.get(urls.skills).set('authorization', token_member).expect(403, done);
  });

  it('list by id', done => {
    agent.get(urls.skills + '/3').set('authorization', token_owner).end((err, res) => {
      assert.notEqual(null, res.body);
      assert.equal(200, res.statusCode);
      done();
    });
  });

  it('list by id (without token)', done => {
    agent.get(urls.skills + '/3').expect(401, done);
  });

  it('list by id (as member)', done => {
    agent.get(urls.skills + '/3').set('authorization', token_member).expect(403, done);
  });

  it('list by id (not existing user)', done => {
    agent.get(urls.skills + '/100').set('authorization', token_owner).expect(404, done);
  });

  it('create', done => {
    agent
      .post(urls.skills)
      .set('authorization', token_owner)
      .send({
        name: 'Test skill',
        parent_id: 1
      })
      .expect(201, done);
  });

  it('create (without token)', done => {
    agent
      .post(urls.skills)
      .send({
        name: 'Test skill',
        parent_id: 1
      })
      .expect(401, done);
  });

  it('create (as member)', done => {
    agent
      .post(urls.skills)
      .set('authorization', token_member)
      .send({
        name: 'Test skill',
        parent_id: 1
      })
      .expect(403, done);
  });

  it('create errors', done => {
    async.each(
      createCredentials,
      (item, cb) => {
        agent.post(urls.skills).set('authorization', token_owner).send(item[0]).end((err, res) => {
          if (item[1] === res.statusCode) {
            cb();
          } else {
            cb(new Error(item[2]));
          }
        });
      },
      err => {
        done(err);
      }
    );
  });
});
