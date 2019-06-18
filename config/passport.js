const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.mongodb.net/test?retryWrites=true&w=majority";

module.exports = function (passport) {
  passport.use(new localStrategy(function(Username, Password, done){
      MongoClient.connect(uri, {useNewUrlParser: true}, function(err, client){
          if(err){
              return done(err);
          }
          else{
              const collectionAccountAdmin = client.db('shoppingdb').collection('Account-Admin');
                collectionAccountAdmin.findOne({Username: Username}, function(err, user){
                  client.close();
                  if(err){
                    return done(err);
                  }
                  else{
                    if(!user){
                      return done(null, false, {message: "Incorrect Username"});
                    }
                    if(!bcrypt.compareSync(Password, user.Password)){
                      return done(null, false, {message: "Incorrect Password"});
                    }
                    return done(null, user)
                  }
                });
          }
      });
  }));

  passport.serializeUser(function(user, done){
  done(null, user.Username);
  });

  passport.deserializeUser(function(Username, done) {
    MongoClient.connect(uri, {useNewUrlParser: true}, function(err, client){
      if(err){
          return done(err);
      }
      else{
        const collectionAccountAdmin = client.db('shoppingdb').collection('Account-Admin');
        collectionAccountAdmin.findOne({Username: Username}, function(err, user){
          client.close();
          if(err){
            return done(err);
          }
          done(err, user);
        });
      }
    });
  });
}