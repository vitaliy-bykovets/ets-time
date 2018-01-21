'use strict';
const { activeProjectsInDay } = require('./../../config');
const { hasRole, knex } = require('./../../libs');

module.exports = (req, res, next) => {
  // Owner can create any project
  if (hasRole(req._user.roles, ['owner', 'pm'])) {
    next();
  } else {
    // Member can create line only with exist project!
    knex('track_lines')
      .count('id as c')
      .where(knex.raw('BINARY `project`'), req._vars.project)
      .orderBy('project', 'asc')
      .orderByRaw('CHAR_LENGTH(project) asc')
      .where('date_task', '>', knex.raw(`DATE_SUB(now(), INTERVAL ${activeProjectsInDay} DAY)`))
      .first()
      .then(cnt => {
        if (cnt.c === 0) {
          res.status(400).json({
            errors: {
              project: ['Project not found.']
            }
          });
        } else {
          next();
        }
      })
      .catch(next);
  }
};
