const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const account = require('../../models/account');
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.gcp.mongodb.net/test?retryWrites=true";

router.get('/register', function(req, res, next){
    res.render('register', {title: 'Register', layout: ""});
});

router.post('/register', function(req, res, next){
    req.checkBody('Username', 'tên người dùng').notEmpty();
    req.checkBody('Password', 'mật khẩu').notEmpty().isLength({min: 10, max: 20});
    req.checkBody('Email', 'email').isEmail();
    let errors = req.validationErrors();
    
    if(errors){
        var mess;
        for(var i = 0; i<errors.length; i++){
            mess = mess + ", " + errors[i].msg;
        }
        mess = mess + " không hợp lệ!";
        res.render('register', {title: 'Đăng Kí', layout: "", 'mess': mess});
    }
    else{
        MongoClient.connect(uri, {useNewUrlParser: true}, function(err, client){
            if(err){
                console.log(err);
            }
            else{
                const collectionAccountAdmin = client.db("shoppingdb").collection("Account-Admin");
                let Asycn_Await = async()=>{
                    let acc = await collectionAccountAdmin.findOne({Username: req.body.Username});
                    if(acc){
                        client.close();
                        res.render('register', {title: 'Đăng Kí', layout: "", 'mess': "Tên người dùng đã tồn tại"});
                    }
                    else{
                        req.body.Password = bcrypt.hashSync(req.body.Password, 10);
                        const acc = new account(req.body);
                        collectionAccountAdmin.insertOne(acc, function(err, res){
                            client.close();
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
                }
                Asycn_Await();
            }
        });
    }
});

module.exports = router;