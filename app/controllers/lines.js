const express = require('express');
const router = express.Router();
const mw = require('./../middlewares/index');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({ 1: 2 });
});

router.post('/', mw.validators.line_create, (req, res) => {
  res.json({ created: 'yes' });
});

module.exports = router;
