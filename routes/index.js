var express = require('express');
var models = require('../models');
var players = require('./players');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  models.UserRole.findAll()
    .then(function (userRoles) {
      res.render('index', {
        title: 'Sequelize: Express Example',
        userRoles: userRoles
      });
    });
 // res.render('index', { title: 'Express' });
});

module.exports = router;
