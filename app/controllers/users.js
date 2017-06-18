const express = require('express');
const router = express.Router();
const mw = require('./../middlewares/index');
const knex = require('./../libs/knex');
const _ = require('lodash');
const async = require('async');

// username, position, role
const criteriaForList = function(p) {
  return function() {
    if (p.username) {
      this.where('first_name', 'like', '%' + p.username + '%').orWhere('last_name', 'like', '%' + p.username + '%');
    }
    if (p.position) {
      this.where('position', 'like', '%' + p.position + '%');
    }
    if (p.role) {
      this.where('roles', 'like', '%' + p.role + '%');
    }
  };
};

/* Create user */
router.post('/', mw.validators.user_create, (req, res) => {
  knex('users').insert(req.body).then(() => res.status(201).send()).catch(e => res.status(500).send(e.message));
});

/* GET users listing. */
router.get('/', mw.validators.users_list, async (req, res) => {
  let param = req.query;

  async.parallel(
    {
      count: callback => {
        knex('users').where(criteriaForList(param)).first().count('* as c').asCallback(callback);
      },
      list: callback => {
        knex('users')
          .select('first_name', 'last_name', 'roles', 'position', 'email', 'rate', 'id')
          .where(criteriaForList(param))
          .orderBy('created_at', 'desc')
          .asCallback(callback);
      }
    },
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(400).end();
      } else if (results) {
        res.json({
          count: results.count.c,
          data: results.list
        });
      }
    }
  );
});

// update track-line by id
//router.patch('/', mw.validators.line_edit, (req, res) => {
//  knex('track_lines')
//    .where({ id: req.body.id, user_id: 1 })
//    .update(_.omit(req.body, 'user_id'))
//    .then(() => res.send())
//    .catch(() => res.status(400).send());
//});

// delete track line
//router.delete('/', mw.validators.line_delete, (req, res) => {
//  knex('track_lines')
//    .where({ id: req.body.id, user_id: 1 })
//    .delete()
//    .then(() => res.status(204).send())
//    .catch(() => res.status(400).send());
//});

// update status for track line (by admin | pm)
//router.patch('/status', mw.validators.line_status, (req, res) => {
//  knex('track_lines')
//    .where({ id: req.body.id })
//    .update({ status: req.body.status })
//    .then(() => res.send())
//    .catch(() => res.status(500).send());
//});

module.exports = router;
