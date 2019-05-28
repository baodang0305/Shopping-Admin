const express = require('express');
const router = express.Router();
var ObjectId = require('mongodb').ObjectId;
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.gcp.mongodb.net/test?retryWrites=true";

router.get('/account-list', function(req, res, next){
    MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
        if(err){
          console.log(err);
        }
        else{
          const collectionCustomer = client.db("shoppingdb").collection("Customer");
          let Async_Await = async()=>{
            let account_list = await collectionCustomer.find({}).toArray();
            res.render('account-list', {title: 'Account Customer', 'account_list': account_list });
          }
          Async_Await();
        }
      });
});
module.exports = router;