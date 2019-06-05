const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const account = require('../../models/account');
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.gcp.mongodb.net/test?retryWrites=true";

router.get('/register', function(req, res, next){
    res.render('register', {title: 'Register', layout: ""});
});

router.post('/', function(req, res, next){
    MongoClient.connect(uri, {useNewUrlParser: true}, function(err, client){
        if(err){
            console.log(err);
        }
        else{
            const collectionAccountAdmin = client.db("shoppingdb").collection("Account-Admin");
            req.body.Password = bcrypt.hashSync(req.body.Password, 10);
            const acc = new account(req.body);
            collectionAccountAdmin.insertOne(acc, function(err, res){
                if(err){
                    return next(err);
                }
                else{
                    console.log("Account admin is added ");
                }
            });
            req.login(acc, function(err){
                if(err){
                    return next(err);
                }
                return res.render('index' , {title: "Trang Chủ", 'mess': req.user.Username}); 
            })
        }
    });
});

module.exports = router;