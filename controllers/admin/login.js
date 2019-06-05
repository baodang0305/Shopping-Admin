const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', function(req, res, next){
    res.render('login', {title: 'Login', layout: ""});
});

router.post('/login',
  passport.authenticate('local', {failureRedirect: '/login'}),
  function(req, res){
    res.render('index', {mess: req.user.Username});
  }
);

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
module.exports = router;