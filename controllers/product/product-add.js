var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.gcp.mongodb.net/test?retryWrites=true";
const product = require("../../models/product");

router.get('/product-add', function(req,res, next){
  res.render('product-add', {title: 'Product Add'});
});

router.post('/add_product', function(req, res, next){
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    if(err){
      console.log(err);
    }
    else{
      const collectionProduct = client.db("shoppingdb").collection("Product");
      const pro = new product(req.body);
      collectionProduct.insertOne(pro, function(err, res){
        console.log("product is added ");
      });
      res.redirect('/product-list');
    }
  });
});

module.exports = router;
