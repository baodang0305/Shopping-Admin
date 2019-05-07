var express = require('express');
var router = express.Router();

router.get('/product-detail', function(req, res,next){
  res.render('product-detail', { title: 'Chi tiết sản phẩm' });
});

router.get('/product-list', function (req, res, next) {
  res.render('product-list', { title: 'Express' });
});

router.get('/product-cart', function (req, res, next) {
  res.render('product-cart', { title: 'Express' });
});

router.get('/product-edit', function (req, res, next) {
  res.render('product-edit', { title: 'Express' });
});

router.get('/product-payment', function (req, res, next) {
  res.render('product-payment', { title: 'Express' });

router.get('/alerts', function (req, res, next) {
  res.render('alerts', { title: 'Express' });
});

router.get('/analytics', function (req, res, next) {
  res.render('analytics', { title: 'Express' });
});

router.get('/area-charts', function (req, res, next) {
  res.render('area-charts', { title: 'Express' });
});

router.get('/bar-charts', function (req, res, next) {
  res.render('bar-charts', { title: 'Express' });
});

router.get('/basic-form-element', function (req, res, next) {
  res.render('basic-form-element', { title: 'Express' });
});

router.get('/blog', function (req, res, next) {
  res.render('blog', { title: 'Express' });
});

router.get('/blog-details', function (req, res, next) {
  res.render('blog-details', { title: 'Express' });
});

router.get('/buttons', function (req, res, next) {
  res.render('buttons', { title: 'Express' });
});

router.get('/c3', function (req, res, next) {
  res.render('c3', { title: 'Express' });
});

router.get('/code-editor', function (req, res, next) {
  res.render('code-editor', { title: 'Express' });
});

router.get('data-maps', function (req, res, next) {
  res.render('data-maps', { title: 'Express' });
});

router.get('/data-table', function (req, res, next) {
  res.render('data-table', { title: 'Express' });
});

router.get('/dual-list-box', function (req, res, next) {
  res.render('dual-list-box', { title: 'Express' });
});

router.get('/file-manager', function (req, res, next) {
  res.render('file-manager', { title: 'Express' });
});

router.get('/google-map', function (req, res, next) {
  res.render('google-map', { title: 'Express' });
});

router.get('/images-cropper', function (req, res, next) {
  res.render('images-cropper', { title: 'Express' });
});

router.get('/line-charts', function (req, res, next) {
  res.render('line-charts', { title: 'Express' });
})

router.get('/lock', function (req, res, next) {
  res.render('lock', { title: 'Express' });
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/mailbox', function (req, res, next) {
  res.render('mailbox', { title: 'Express' });
});

router.get('/mailbox-compose', function (req, res, next) {
  res.render('mailbox-compose', { title: 'Express' });
});

router.get('/mailbox-view', function (req, res, next) {
  res.render('mailbox-view', { title: 'Express' });
});

router.get('/modals', function (req, res, next) {
  res.render('modals', { title: 'Express' });
});

router.get('/multi-upload', function (req, res, next) {
  res.render('multi-upload', { title: 'Express' });
});

router.get('/notifications', function (req, res, next) {
  res.render('notifications', { title: 'Express' });
});

router.get('/password-meter', function (req, res, next) {
  res.render('password-recovery', { title: 'Express' });
});

router.get('/petity', function (req, res, next) {
  res.render('petity', { title: 'Express' });
});

router.get('/preloader', function (req, res, next) {
  res.render('preloader', { title: 'Express' });
});


});

router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Express' });
});

router.get('/rounded-chart', function (req, res, next) {
  res.render('rounded-chart', { title: 'Express' });
});

router.get('/sparkline', function (req, res, next) {
  res.render('sparkline', { title: 'Express' });
});

router.get('/static-table', function (req, res, next) {
  res.render('static-table', { title: 'Express' });
});

router.get('/tabs', function (req, res, next) {
  res.render('tabs', { title: 'Express' });
});

router.get('/tinymc', function (req, res, next) {
  res.render('tinymc', { title: 'Express' });
});

router.get('/tree-view', function (req, res, next) {
  res.render('tree-view', { title: 'Express' });
});

router.get('/widgets', function (req, res, next) {
  res.render('widgets', { title: 'Express' });
});

router.get('/x-editable', function (req, res, next) {
  res.render('x-editable', { title: 'Express' });
});


router.get('/accordion', function (req, res, next) {
  res.render('accordion', { title: 'Express' });
});

router.get('/advance-form-element', function (req, res, next) {
  res.render('advance-form-element', { title: 'Express' });
});
module.exports = router;
