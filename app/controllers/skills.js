const express = require('express');
const router = express.Router();
const knex = require('./../libs/knex');
const {
  validators: { skill_create: create, skill_edit: edit, skill_delete: remove }
} = require('./../middlewares/index');

/* Create skill */
router.post('/', create, (req, res, next) => {
  knex('skills').insert(req._vars).then(() => res.status(201).end()).catch(next);
});

/* Edit skill */
router.patch('/', edit, (req, res, next) => {
  knex('skills')
    .where({ id: req.body.id, parent_id: req.body.parent_id })
    .update(req._vars)
    .then(() => res.end())
    .catch(next);
});

/* Remove skill */
router.delete('/', remove, (req, res, next) => {
  knex('skills').where('id', req.body.id).del().then(() => res.status(204).end()).catch(next);
});

module.exports = router;
