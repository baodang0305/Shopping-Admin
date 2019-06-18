var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.mongodb.net/test?retryWrites=true&w=majority";

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
        client.close();
        res.render('account-detail', {title: 'Account Detail', 'customerid': customerid, 'user': req.user});
      }
      Async_Await();
    }
  });
});

module.exports = router;