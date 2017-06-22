'use strict';
const express = require('express');
const router = express.Router();
const knex = require('./../libs/knex');
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const Validator = require('./../middlewares/validators/Validator');
const { auth } = require('./../middlewares/index');

/* Auth user */
router.post('/', (req, res, next) => {
  const rules = {
    email: 'required|email|email_exist',
    password: 'required|min:5'
  };

  const validate = new Validator(req.body, rules);

  validate.passes(() => {
    // get email and check password
    knex('users')
      .where('email', req.body.email)
      .select('email', 'password', 'id')
      .where('locked', 0)
      .first()
      .then(data => {
        if (data) {
          if (bcrypt.compareSync(req.body.password, data.password)) {
            // generate token
            let token = crypto.randomBytes(16).toString('hex');
            knex('tokens')
              .insert({ token: token, user_id: data.id })
              .then(() => res.json({ token: token }))
              .catch(next);
          } else {
            res.status(401).send();
          }
        } else {
          res.status(401).send();
        }
      })
      .catch(() => res.status(500).send());
  });
  validate.fails(() => res.status(400).send(validate.errors));
});

/* Me */
router.get('/me', auth, (req, res) => res.json(req._user));

/* Logout */
router.post('/logout', auth, (req, res) => {
  knex('tokens').where('token', req._user.token).del().then(() => res.status(204).send()).catch(next);
});

module.exports = router;
