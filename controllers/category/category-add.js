var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.gcp.mongodb.net/test?retryWrites=true";
const category = require("../../models/category");

router.get('/category-add', function(req,res, next){
  res.render('category-add', {title: 'Category Add'});
});

router.post('/add_category', function(req, res, next){
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    if(err){
      console.log(err);
    }
    else{
      const collectionCategory = client.db("shoppingdb").collection("Category");
      const cate = new category(req.body);
      collectionCategory.insertOne(cate, function(err, res){
        console.log("category is added ");
      });
      res.redirect('/category-list');
    }
  });
});

module.exports = router;
