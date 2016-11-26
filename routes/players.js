var express = require('express');
var models = require('../models');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.Player.findAll()
  .then(function(players){
    res.send(JSON.stringify(players));
  });
  //res.send('respond with a resource');
});

module.exports = router;
