var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;
var mongoose = require('mongoose');
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.gcp.mongodb.net/test?retryWrites=true";

let object_id;
router.get('/account-detail-:id', function(req,res, next){
  var id = req.params.id;
  object_id = new ObjectId(id);
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    if(err){
      console.log(err);
    }
    else{
      const collectionCustomer = client.db("shoppingdb").collection("Customer");
      let Async_Await = async()=>{
        let customerid = await collectionCustomer.findOne({_id: object_id});
        res.render('account-detail', {title: 'Account Detail', 'customerid': customerid});
      }
      Async_Await();
    }
  });
});

router.post('/account-list', function(req, res){
  res.redirect('account-list');
});

module.exports = router;