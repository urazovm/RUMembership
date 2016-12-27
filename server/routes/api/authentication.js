var express = require('express');
var passport = require('passport');

var usersController = require('../../controllers/users');

var router = express.Router();



router.post('/local', function (request, response, next) {
    passport.authenticate('local', function (error, user, info) {
        if (!user) {
            response.status(401);
            response.json({ "reason": "Invalid credentials" });
        } else {
            request.logIn(user, function (error) {
                if (error) {
                    response.status(500);
                    response.json({ "error": "Server error" });
                }
            });
            return usersController.getUser(user.id).then(function (user) {
                return response.json(user);
            }).catch(function (error) {
                return response.json(error);
            });

        }
    })(request, response, next);
});

module.exports = router;