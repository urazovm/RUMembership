var express = require('express');
var models = require('../models');
var router = express.Router();

var api = require('./api');

router.use('/api', api);

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('in API');
  res.json({ "apiRoot": true });
});

// Once we start with a client and have authentication, 
// this will redirect to the angular app
// router.get("/*", authenticationHelpers.isAuthOrRedirect, function(req, res, next) {
//   res.sendFile(path.join(__dirname, '../', 'index.html'));
// });

module.exports = router;
