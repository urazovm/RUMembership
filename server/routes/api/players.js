var express = require('express');
var models = require('../../models');
var playersController = require('../../controllers/players');
var router = express.Router();

///players
router.route('/')
  /* GET users listing. */
  .get(function (req, res) {
    playersController.getAllPlayers()
      .then(function (players) {
        res.send(players);
      });
  })
  .post(function (req, res) {
    if (!req.body) {
      res.send("Please send some JSON");
    }
    else {
      if (playersController.playerHasRequiredValues(req.body)) {

        playersController.createPlayer(req.body)
          .then(function (player) {
            res.send(player);
          }).catch(function (error) {
            res.send(error);
          });
      } else {
        res.send(playersController.playerGetMissingValues(req.body));
      }
    }
  });

router.route('/:playerID')
  .get(/* add authentication here */function (req, res) {
    //get player by ID
    playersController.getPlayer(req.params.playerID).then(function (player) {
      res.json(player);
    }).catch(function (error) {
      res.send(error);
    });
  })
  .put(function (req, res) {
    // update player info
    playersController.updatePlayerMinorInfo(req.body).then(function (succ) {
      res.json(succ.player);
    }).catch(function (error) {
      res.send(error);
    })
    // console.log('put player!');
    // res.send('put captured, will do stuff later');
  });

module.exports = router;
