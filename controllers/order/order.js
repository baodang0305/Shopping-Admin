var express = require('express');
var router = express.Router();
var ObjectId = require("mongodb").ObjectID;
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.gcp.mongodb.net/test?retryWrites=true";

router.get('/order-list', function(req, res, next) {
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    if(err){
      console.log(err);
    }
    else{
      console.log("Successfully connected");
      const collectionOrder = client.db("shoppingdb").collection("Order");
      let Async_Await = async()=>{
        try {
          let listOrder = await collectionOrder.find().toArray();
          res.render('order-list', {title: 'Danh sách đơn đặt hàng', listOrder: listOrder});
        } catch (err) {
          res.render('order-list', {title: 'Danh sách đơn đặt hàng', listOrder: []});
          alert(err)
        }
      }
      Async_Await();
    }
  });
});

module.exports = router;
