const express = require('express');
const router = express.Router();
const mw = require('./../middlewares/index');
const Line = require('./../models/Line');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({ 1: 2 });
});

router.post('/', mw.validators.line_create, (req, res) => {
  new Line(req.body)
    .save()
    .then(model => {
      console.log(model);
    })
    .catch(e => {
      console.log('――― i am here: lines.js:16');
      console.log(e);
    });
  res.json({ created: 'yes' });
});

module.exports = router;
