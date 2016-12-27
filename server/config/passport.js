var User = require('../models').User;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(
    new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (request, username, password, done) {
            process.nextTick(function () {
                /**
                 * Find one user with the given username
                 * Verify that one exists, that the user has
                 * the local provider, and that the password hashs
                 * match correctly.
                 */
                return User.findOne({ where: { username: username } }).then(function (user) {
                    if (!user) { return done(null, false); }
                    if (!user.verifyPassword(password)) { return done(null, false); }
                    return done(null, user);
                }).catch(function (error) {
                    return done(error);
                }); // end User.findOne()

            }); // end process.newTick()

        }) // end function(request...) & new google strategy

); // end passport.use()
