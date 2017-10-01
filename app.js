var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var redis = require('redis');

require("dotenv").config();

var app = express();

// REDIS
var client = redis.createClient(); // connected locally

client.on('connect', function () {
  console.log('Redis connected');
});

client.on('error', function (error) {
  console.log(error);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render("index.html");
});

app.get('/get/:key', function (req, res) {
  if (req.params.key)
    client.get(req.params.key, function (err, value) {
      if (err)
        return res.status(422).send({
          err
        });
      else
        return res.status(200).send({
          value
        });
    });
  else
    return res.status(422).send({
      message: "Please provide a key"
    });
});

app.post('/set', function (req, res) {
  if (req.body.key && req.body.value) {
    client.expire('string key', 3);
    client.set(req.body.key, req.body.value, function (err, status) {
      if (err)
        return res.status(422).send({
          err
        });
      else
        return res.status(200).send({
          status
        });
    });
  } else{
    return res.status(422).send({
      message: "Please provide a key, value"
    });
  }
});

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
  res.send({
    err
  });
});

module.exports = app;