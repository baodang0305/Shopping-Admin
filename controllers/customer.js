var express = require('express');
var router = express.Router();

router.get('/management-acount', function(req, res, next) {
  res.render('management-acount', { title: 'Express' });
});

module.exports = router;