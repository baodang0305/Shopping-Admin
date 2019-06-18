const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', function(req, res){
    res.render('login', {title: 'Login', layout: ""});
});

router.post('/login',
  passport.authenticate('local', {failureRedirect: '/login', successRedirect: '/'})
);

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/check', function(req, res){
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
      if(err){
        console.log(err);
      }
      else{
          const userController = client.db('shoppingdb').collection('Customer');
          let Asycn_Await = async()=>{
              const userExist = await userController.findOne({Username: req.query.Username});
              if(userExist){
                  res.json(true);
              }
              else{
                  res.json(false);
              }
          }
          Asycn_Await();
      }
  })
});
module.exports = router;