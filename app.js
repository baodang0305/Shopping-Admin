var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./controllers/index');
var productListRouter = require('./controllers/product/product-list');
var productEditRouter = require('./controllers/product/product-edit');
var productAddRouter = require('./controllers/product/product-add');
var categoryListRouter = require('./controllers/category/category-list');
var categoryAddRouter = require('./controllers/category/category-add');
var categoryEditRouter = require('./controllers/category/category-edit');
var manufacturerRouter = require('./controllers/manufacturer/manufacturer');
var orderRouter = require('./controllers/order/order');
var loginRouter = require('./controllers/admin/login');
var registerRouter = require('./controllers/admin/register');
var accountListRouter = require('./controllers/customer/account_list');
var accountDetailRouter = require('./controllers/customer/account_detail');

var app = express();

// view engine setup
app.set('views', [
  path.join(__dirname, 'views'),
  path.join(__dirname, 'views/product'),
  path.join(__dirname, 'views/customer'),
  path.join(__dirname, 'views/manufacturer'),
  path.join(__dirname, 'views/order'),
  path.join(__dirname, 'views/category'),
  path.join(__dirname, 'views/admin')
]);

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public/images')));
app.use(express.static(path.join(__dirname, 'public/images/blog-details')));
app.use(express.static(path.join(__dirname, 'public/images/contact')));
app.use(express.static(path.join(__dirname, 'public/images/cropper')));
app.use(express.static(path.join(__dirname, 'public/images/logo')));
app.use(express.static(path.join(__dirname, 'public/images/notification')));
app.use(express.static(path.join(__dirname, 'public/images/product')));

app.use(express.static(path.join(__dirname, 'public/stylesheets')));
app.use(express.static(path.join(__dirname, 'public/stylesheets/c3')));
app.use(express.static(path.join(__dirname, 'public/stylesheets/chosen')));
app.use(express.static(path.join(__dirname, 'public/stylesheets/code-editor')));
app.use(express.static(path.join(__dirname, 'public/stylesheets/colorpicker')));
app.use(express.static(path.join(__dirname, 'public/stylesheets/cropper')));
app.use(express.static(path.join(__dirname, 'public/stylesheets/data-table')));
app.use(express.static(path.join(__dirname, 'public/stylesheets/datapicker')));
app.use(express.static(path.join(__dirname, 'public/stylesheets/dropzone')));
app.use(express.static(path.join(__dirname, 'public/stylesheets/duallistbox')));
app.use(express.static(path.join(__dirname, 'public/stylesheets/editor')));
app.use(express.static(path.join(__dirname, 'public/stylesheets/form')));
app.use(express.static(path.join(__dirname, 'public/stylesheets/ionRangeSlider')));
app.use(express.static(path.join(__dirname, 'public/stylesheets/metisMenu')));
app.use(express.static(path.join(__dirname, 'public/stylesheets/morrisjs')));
app.use(express.static(path.join(__dirname, 'public/stylesheets/notifications')));
app.use(express.static(path.join(__dirname, 'public/stylesheets/preloader')));
app.use(express.static(path.join(__dirname, 'public/stylesheets/scrollbar')));
app.use(express.static(path.join(__dirname, 'public/stylesheets/select2')));
app.use(express.static(path.join(__dirname, 'public/stylesheets/summernote')));
app.use(express.static(path.join(__dirname, 'public/stylesheets/touchspin')));
app.use(express.static(path.join(__dirname, 'public/stylesheets/tree-viewer')));

app.use(express.static(path.join(__dirname, 'public/javascripts')));
app.use(express.static(path.join(__dirname, 'public/javascripts/c3-charts')));
app.use(express.static(path.join(__dirname, 'public/javascripts/chart')));
app.use(express.static(path.join(__dirname, 'public/javascripts/charts')));
app.use(express.static(path.join(__dirname, 'public/javascripts/chosen')));
app.use(express.static(path.join(__dirname, 'public/javascripts/code-editor')));
app.use(express.static(path.join(__dirname, 'public/javascripts/colorpicker')));
app.use(express.static(path.join(__dirname, 'public/javascripts/counterup')));
app.use(express.static(path.join(__dirname, 'public/javascripts/cropper')));
app.use(express.static(path.join(__dirname, 'public/javascripts/data-map')));
app.use(express.static(path.join(__dirname, 'public/javascripts/data-table')));
app.use(express.static(path.join(__dirname, 'public/javascripts/datapicker')));
app.use(express.static(path.join(__dirname, 'public/javascripts/dropzone')));
app.use(express.static(path.join(__dirname, 'public/javascripts/duallistbox')));
app.use(express.static(path.join(__dirname, 'public/javascripts/editable')));
app.use(express.static(path.join(__dirname, 'public/javascripts/google.maps')));
app.use(express.static(path.join(__dirname, 'public/javascripts/icheck')));
app.use(express.static(path.join(__dirname, 'public/javascripts/input-mask')));
app.use(express.static(path.join(__dirname, 'public/javascripts/ionRangeSlider')));
app.use(express.static(path.join(__dirname, 'public/javascripts/knob')));
app.use(express.static(path.join(__dirname, 'public/javascripts/metisMenu')));
app.use(express.static(path.join(__dirname, 'public/javascripts/morrisjs')));
app.use(express.static(path.join(__dirname, 'public/javascripts/notifications')));
app.use(express.static(path.join(__dirname, 'public/javascripts/password-meter')));
app.use(express.static(path.join(__dirname, 'public/javascripts/pdf')));
app.use(express.static(path.join(__dirname, 'public/javascripts/peity')));
app.use(express.static(path.join(__dirname, 'public/javascripts/rangle-slider')));
app.use(express.static(path.join(__dirname, 'public/javascripts/scrollbar')));
app.use(express.static(path.join(__dirname, 'public/javascripts/select2')));
app.use(express.static(path.join(__dirname, 'public/javascripts/sparkline')));
app.use(express.static(path.join(__dirname, 'public/javascripts/summernote')));
app.use(express.static(path.join(__dirname, 'public/javascripts/touchspin')));
app.use(express.static(path.join(__dirname, 'public/javascripts/tree-line')));
app.use(express.static(path.join(__dirname, 'public/javascripts/vendor')));
app.use(express.static(path.join(__dirname, 'public/javascripts/wizard')));
app.use('/fonts', express.static(path.join(__dirname, 'fonts')));

app.use('/',indexRouter);
app.use('/',productListRouter);
app.use('/',productEditRouter);
app.use('/',productAddRouter);
app.use('/',categoryListRouter);
app.use('/',categoryAddRouter);
app.use('/',categoryEditRouter);
app.use('/', manufacturerRouter);
app.use('/', orderRouter);
app.use('/', loginRouter);
app.use('/',registerRouter);
app.use('/',accountListRouter);
app.use('/',accountDetailRouter);

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
