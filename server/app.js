var express = require('express');
var path = require('path');
var http = require('http');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var db = require('./models');
var utils = require('./controllers/utils');

var app = express();

app.use(favicon(path.join(__dirname, 'public', 'ru.jpg')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', routes);

console.log(app.get('env'));
if (app.get('env') === 'production') {
  app.use(express.static(path.join(__dirname, '/../dist/client')));
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //  res.render('error');
  res.json({
    error: {},
    message: err.message
  });
});

db.sequelize.authenticate()
  .then(function (err) {
    console.log('Connection established.');
  })
  .catch(function (err) {
    console.log("Unable to connect to database: ", err);
  });

db.sequelize.sync().then(function () {
  utils.addDefaultValues();

  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
