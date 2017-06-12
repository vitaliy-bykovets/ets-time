const express = require('express');
const router = express.Router();
const mw = require('./../middlewares/index');
const Line = require('./../models/Line');
const knex = require('./../libs/Db').knex;
const _ = require('lodash');

/* GET users listing. */
router.get('/', mw.validators.line_list, (req, res) => {
  knex('track_lines')
    .then(data => {
      console.log('data', data);
    })
    .catch(e => {
      console.log('e', e);
    });
});

router.post('/', mw.validators.line_create, (req, res) => {
  new Line(req.body).save().then(model => res.status(201).send()).catch(e => res.status(400).send());
});

// update track-line by id
router.patch('/', mw.validators.line_edit, (req, res) => {
  new Line({ id: req.body.id, user_id: 1 })
    .save(_.omit(req.body, 'user_id'), { patch: 1 })
    .then(model => res.send())
    .catch(e => res.status(400).send());
});

// delete track line
router.delete('/', mw.validators.line_delete, (req, res) => {
  new Line({ id: req.body.id, user_id: 1 })
    .destroy()
    .then(() => res.status(204).send())
    .catch(e => res.status(400).send());
});

module.exports = router;
