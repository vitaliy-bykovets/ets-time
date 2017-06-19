const express = require('express');
const router = express.Router();
const mw = require('./../middlewares/index');
const knex = require('./../libs/knex');
const _ = require('lodash');
const async = require('async');

const criteriaForList = function(param) {
  return function() {
    if (param.user_name) {
      this.where('u.first_name', 'like', '%' + param.user_name + '%').orWhere(
        'u.last_name',
        'like',
        '%' + param.user_name + '%'
      );
    }
    if (param.project) {
      this.where('tl.project', 'like', '%' + param.project + '%');
    }
    if (param.date_start) {
      this.where('tl.date_task', '>=', param.date_start);
    }
    if (param.date_end) {
      this.where('tl.date_task', '<=', param.date_end);
    }
    if (param.status) {
      this.where('tl.status', param.status);
    }
    if (param.type_work) {
      this.where('tl.type_work', param.type_work);
    }
  };
};

/* GET users listing. */
router.get('/', mw.validators.line_list, async (req, res) => {
  let param = req.query;

  async.parallel(
    {
      count: callback => {
        knex('track_lines as tl')
          .where(criteriaForList(param))
          .leftJoin('users as u', 'u.id', 'tl.user_id')
          .first()
          .count('* as c')
          .asCallback(callback);
      },
      list: callback => {
        knex('track_lines as tl')
          .select('tl.*', 'u.first_name', 'u.last_name', 'u.roles', 'u.position', 'u.locked', 'u.email')
          .where(criteriaForList(param))
          .leftJoin('users as u', 'u.id', 'tl.user_id')
          .orderBy('tl.created_at', 'desc')
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

router.post('/', mw.validators.line_create, (req, res) => {
  knex('track_lines').insert(req.body).then(() => res.status(201).send()).catch(e => res.status(500).send());
});

// update track-line by id
router.patch('/', mw.validators.line_edit, (req, res) => {
  knex('track_lines')
    .where({ id: req.body.id, user_id: 1 })
    .update(_.omit(req.body, 'user_id'))
    .then(() => res.send())
    .catch(() => res.status(400).send());
});

// delete track line
router.delete('/', mw.validators.line_delete, (req, res) => {
  knex('track_lines')
    .where({ id: req.body.id, user_id: 1 })
    .delete()
    .then(() => res.status(204).send())
    .catch(() => res.status(400).send());
});

// update status for track line (by admin | pm)
router.patch('/status', mw.validators.line_status, (req, res) => {
  knex('track_lines')
    .where({ id: req.body.id })
    .update({ status: req.body.status })
    .then(() => res.send())
    .catch(() => res.status(500).send());
});

module.exports = router;
