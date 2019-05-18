var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/product-list', function(req, res, next) {
  res.render('product-list', { title: 'Product-List' });
});

module.exports = router;