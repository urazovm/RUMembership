var express = require('express');
var models = require('../../models');
var playersController = require('../../controllers/players');
var router = express.Router();

router.route('/')
  /* GET users listing. */
  .get(function (req, res) {
    playersController.getAllPlayers(res);
  })
  .post(function (req, res, next) {
    if (!req.body) {
      res.send("Please send some JSON");
    }
    else {
      playersController.addNewPlayer(req.body, res);
    }
  });

module.exports = router;
