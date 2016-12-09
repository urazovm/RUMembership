var express = require('express');
var models = require('../../models');
var playersController = require('../../controllers/players');
var router = express.Router();

router.route('/')
  /* GET users listing. */
  .get(function (req, res) {
    playersController.getAllPlayers()
      .then(function (players) {
        res.send(players);
      });
  })
  .post(function (req, res, next) {
    if (!req.body) {
      res.send("Please send some JSON");
    }
    else {
      if (playersController.playerHasRequiredValues(req.body)) {

        playersController.createPlayer(req.body)
          .then(function (player) {
            res.send(player);
          });
      } else {
        res.send(playersController.playerGetMissingValues(req.body));
      }
    }
  });

module.exports = router;
