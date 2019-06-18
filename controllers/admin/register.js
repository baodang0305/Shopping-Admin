const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const account = require('../../models/account');
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.mongodb.net/test?retryWrites=true&w=majority";

router.get('/register', function(req, res, next){
    res.render('register', {title: 'Register', layout: ""});
});

router.post('/register', function(req, res, next){
    req.checkBody('Username', 'tên người dùng').notEmpty();
    req.checkBody('Password', 'mật khẩu').isLength({min: 5, max: 20});
    req.checkBody('ConfirmPass', 'mật khẩu xác nhận').isLength({min: 5, max: 20});
    req.checkBody('Email', 'email').isEmail();
    let errors = req.validationErrors();
    
    if(errors){
        var mess = "";
        for(var i = 0; i<errors.length - 1; i++){
            mess = mess + errors[i].msg + ", ";
        }
        mess = mess + errors[errors.length - 1].msg + " không hợp lệ!";
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
                        if(req.body.Password == req.body.ConfirmPass){
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
                                return res.render('index' , {title: "Trang Chủ", 'user': req.user}); 
                            })
                        }
                        else{
                            client.close();
                            res.render('register', {title: 'Đăng Kí', layout: "", 'mess': "mật khẩu xác nhận trùng khớp"});
                        }
                    }
                }
                Asycn_Await();
            }
        });
    }
});

module.exports = router;