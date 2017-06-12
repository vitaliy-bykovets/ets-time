const express = require('express');
const router = express.Router();
const env = require('./../config');

router.get('/', (req, res) => {
  res.json({
    type_works: env.type_works
  });
});

module.exports = router;
