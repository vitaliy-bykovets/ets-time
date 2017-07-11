'use strict';
const express = require('express');
const router = express.Router();
const { validators: { autocomplete } } = require('./../middlewares');
const knex = require('./../libs/knex');

/* Projects */
router.get('/project', autocomplete, (req, res, next) => {
  knex('track_lines')
    .pluck('project')
    .distinct()
    .where('project', 'like', req.query.q + '%')
    .orderByRaw('CHAR_LENGTH(project) asc')
    .then(results => res.json(results))
    .catch(next);
});

module.exports = router;
