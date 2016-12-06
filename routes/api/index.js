var express = require('express');
var router = express.Router();
var players = require('./players');

//add all other api routes here
router.use('/players', players);

//generic get call
router.get('/', function (req, res) {
    console.log('in api/index');
    res.json({ "In API": "OK" });
    //possibly add an explainer here, but maybe not
});

module.exports = router;