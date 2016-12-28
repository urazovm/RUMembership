var express = require('express');
var passport = require('passport');

var usersController = require('../../controllers/users');
var authUtils = require('./authUtils');

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
            return usersController.getMiniUser(user.id).then(function (user) {
                return response.json(user);
            }).catch(function (error) {
                return response.json(error);
            });

        }
    })(request, response, next);
});

router.post('/register', authUtils.isNotAuthOrRedirect, function (request, response, next) {
    usersController.registerUser(request.body).then(function (user) {
        response.json(user);
    }).catch(function (error) {
        console.log(error);
        response.status(400).json({ "reason": error.message });
    });
});

router.route('/authenticated')
    .get(authUtils.isAuth, function (request, response, next) {
        response.json({ "authenticated": true });
    });

module.exports = router;