var express = require('express');
var router = express.Router();
const CONST = require('../api/constants/constants');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.json(CONST.DEFAULT_RESPONSE);
  // console.log(res);
});

module.exports = router;
