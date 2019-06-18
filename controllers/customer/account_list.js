const express = require('express');
const router = express.Router();
var ObjectId = require('mongodb').ObjectId;
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.mongodb.net/test?retryWrites=true&w=majority";

router.get('/account-list', function(req, res, next){
    MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
        if(err){
          console.log(err);
        }
        else{
          const collectionCustomer = client.db("shoppingdb").collection("Customer");
          let Async_Await = async()=>{
            let account_list = await collectionCustomer.find({}).toArray();
            client.close();
            res.render('account-list', {title: 'Account Customer', 'account_list': account_list, 'user': req.user });
          }
          Async_Await();
        }
      });
});

router.post('/account-delete-:id', function(req, res){
  let id = req.params.id;
  let object_id = new ObjectId(id);
  MongoClient.connect(uri, {useNewUrlParser: true}, function(err, client){
    if(err){
      console.log(err);
      return;
    }
    else{
      const collectionCustomer = client.db('shoppingdb').collection("Customer");
      collectionCustomer.deleteOne({_id: object_id}, function(err){
        if(err) console.log("delete error");
        else{
          console.log("delete is success");
          res.redirect('/account-list');
        }
      })
    }
  })
})
module.exports = router;