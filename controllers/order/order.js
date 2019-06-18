var express = require('express');
var router = express.Router();
var ObjectId = require("mongodb").ObjectID;
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.mongodb.net/test?retryWrites=true&w=majority";

router.get('/order-list', function(req, res, next) {
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    if(err){
      console.log(err);
    }
    else{
      const collectionOrder = client.db("shoppingdb").collection("Order");
      let Async_Await = async()=>{
          let listOrder = await collectionOrder.find().toArray();
          client.close();
          res.render('order-list', {title: 'Danh sách đơn đặt hàng', listOrder: listOrder, 'user': req.user});
      }
      Async_Await();
    }
  })
});
let object_id;
router.get('/order-detail-:id', function(req, res) {
  var id = req.params.id;
  object_id = new ObjectId(id);
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    if(err){
      console.log(err);
    }
    else{
      const collectionOrder = client.db("shoppingdb").collection("Order");
      let Async_Await = async()=>{
        let order = await collectionOrder.findOne({_id: object_id});
        let arrProduct = order.Products;
        res.render('order-edit', {title: 'Đơn đặt hàng chi tiết', 'order': order, 'arrProduct': arrProduct, 'user': req.user});
      }
      Async_Await();
    }
  });
});

router.post('/order-edit', function(req, res){
  var name = req.body.ReceiverName;
  var address = req.body.ReceiverAddress;
  var phone = req.body.ReceiverPhonenumber;
  var deliveryStatus = req.body.DeliveryStatus;
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    if(err){
      console.log(err);
    }
    else{
      const collectionOrder = client.db("shoppingdb").collection("Order");
      let Async_Await = async()=>{
        await collectionOrder.findOneAndUpdate(
          {_id: object_id},
          { $set: {
            "ReceiverName": name,
            "ReceiverAddress": address,
            "ReceiverPhonenumber": phone,
            "DeliveryStatus": deliveryStatus
        }})
        client.close();
        res.redirect("/order-list")
      }
      Async_Await();
    }
  });
});

router.post('/order-trash-:id', function(req, res, next) {
  var id = req.params.id;
  var object_id = new ObjectId(id);

  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    if(err){
      console.log(err);
    }
    else{
      const collectionOrder = client.db("shoppingdb").collection("Order");
      let Async_Await = async()=>{
        await collectionOrder.remove({_id: object_id});
        client.close();
        res.redirect("/order-list")
      }
      Async_Await();
    }
  });
});

module.exports = router;
