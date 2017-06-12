const express = require('express');
const router = express.Router();
const env = require('./../config');

router.get('/', (req, res) => {
  res.json({
    type_works: env.type_works,
    task_status: env.task_status
  });
});

module.exports = router;
