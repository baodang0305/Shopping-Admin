var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.gcp.mongodb.net/test?retryWrites=true";

router.get('/product-list', function(req, res, next){
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    if(err){
      console.log(err);
    }
    else{
      const collectionProduct = client.db("shoppingdb").collection("Product");
      let Async_Await = async()=>{
        let product_list = await collectionProduct.find({}).toArray();
        res.render('product-list', {title: 'Product List', 'product_list': product_list});
      }
      Async_Await();
    }
  });
});

router.post('/delete-product-:id', function(req, res, next){
  var id = req.params.id;
  var object_id = new ObjectId(id);
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    if(err){
      console.log(err);
    }
    else{
      const collectionProduct = client.db("shoppingdb").collection("Product");
      collectionProduct.remove({"_id": object_id}, function(err, res){
        if(err){
          console.log(err);
        }
        else{
          console.log("product is deleted");
        }
      });
      res.redirect('/product-list');
    }
  });
});

module.exports = router;
