var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/images/blog-detail')));
app.use(express.static(path.join(__dirname, 'public/images/contact')));
app.use(express.static(path.join(__dirname, 'public/images/logo')));
app.use(express.static(path.join(__dirname, 'public/images/new-product')));
app.use(express.static(path.join(__dirname, 'public/images/cropper')));
app.use(express.static(path.join(__dirname, 'public/images/notification')));
app.use(express.static(path.join(__dirname, 'public/images/product')));
app.use(express.static(path.join(__dirname, 'public/images')));
app.use(express.static(path.join(__dirname, 'public/stylesheets')));
app.use(express.static(path.join(__dirname, 'public/stylesheets/calendar')));
app.use(express.static(path.join(__dirname, 'public/stylesheets/metisMenu')));
app.use(express.static(path.join(__dirname, 'public/stylesheets/morrisjs')));
app.use(express.static(path.join(__dirname, 'public/stylesheets/scrollbar')));

app.use(express.static(path.join(__dirname, 'public/javascripts')));
app.use(express.static(path.join(__dirname, 'public/javascripts/vendor')));
app.use(express.static(path.join(__dirname, 'public/javascripts/scrollbar')));
app.use(express.static(path.join(__dirname, 'public/javascripts/metisMenu')));
app.use(express.static(path.join(__dirname, 'public/javascripts/calendar')));
app.use(express.static(path.join(__dirname, 'public/javascripts/flot')));
app.use(express.static(path.join(__dirname, 'public/javascripts/sparkline')));

app.use('/fonts', express.static(path.join(__dirname, 'fonts')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
