var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/product-edit', function(req, res, next) {
  res.render('product-edit', { title: 'Product-Edit' });
});

module.exports = router;