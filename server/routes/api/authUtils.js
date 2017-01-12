var userController = require('../../controllers/users');

function isAuthOrRedirect(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

function isNotAuthOrRedirect(req, res, next) {
  if (!req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

function isAuth(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.status(401).json({ "authenticated": false });
}

function isNotAuth(req, res, next) {
  if (!req.isAuthenticated()) { return next(); }
  res.json({ "authenticated": true });
}

function isAuthAndAdmin(req, res, next) {
  if (req.isAuthenticated()) {
    userController.userHasRole(req.session.passport.user.id, "GlobalAdmin").then(function (success) {
      if (success) {
        return next();
      }
      res.json(401).json({ "userPermissions": false });
    }).catch(function (error) {
      console.error(error);
      res.json(401).json({ "userPermissions": false });
    });
  } else {
    res.status(401).json({ "authenticated": false });
  }
}

module.exports = {
  isAuthOrRedirect,
  isNotAuthOrRedirect,
  isAuth,
  isNotAuth,
  isAuthAndAdmin
}