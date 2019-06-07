var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.gcp.mongodb.net/test?retryWrites=true";

let object_id;
router.get('/product-edit-:id', function(req,res, next){
  var id = req.params.id;
  object_id = new ObjectId(id);
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    if(err){
      console.log(err);
    }
    else{
      const collectionProduct = client.db("shoppingdb").collection("Product");
      let Async_Await = async()=>{
        let productid = await collectionProduct.findOne({_id: object_id});
        client.close();
        res.render('product-edit', {title: 'Product Edit', 'productid': productid});
      }
      Async_Await();
    }
  });
});

router.post('/edit', function(req, res, next){
 MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    if(err){
      console.log(err);
    }
    else{
      const collectionProduct = client.db("shoppingdb").collection("Product");
      var product_edit = {
        Name: req.body.Name,
        Category: req.body.Category,
        Gender: req.body.Gender,
        Cost: req.body.Cost,
        Discount: req.body.Discount,
        Amount: req.body.Amount,
        Describe: req.body.Describe,
        Product_Group: req.body.Product_Group
      };
      collectionProduct.updateOne({"_id": object_id},{$set: product_edit}, function(err, res){
        if(err){
          console.log(err);
        }
        else{
          client.close();
          console.log("product is Updated ");
        }
      });
      res.redirect('/product-list');
    }
  })
});
module.exports = router;
