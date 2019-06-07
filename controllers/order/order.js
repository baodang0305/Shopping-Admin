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
      console.log("Successfully connected");
      const collectionOrder = client.db("shoppingdb").collection("Order");
      let Async_Await = async()=>{
        try {
          let listOrder = await collectionOrder.find().toArray();
          client.close();
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

router.post('/order-commit:id', function(req, res, next){
  var name = req.body.name;
  var address = req.body.address;
  var phone = req.body.phone;
  var des = req.body.des;

  var id = req.params.id
  if (id != null) {
    var object_id = new ObjectId(id);
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
              "Description": des
          }})
          client.close();
          // let listManufacturer = await collectionManufacturer.find().toArray();
          // res.render('manufacturer-list', {title: 'Danh sách nhà cung ứng', listManufacturer: listManufacturer});
          res.redirect("/order-list")
        }
        Async_Await();
      }
    });
  }
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
        // let listManufacturer = await collectionManufacturer.find().toArray();
        // res.render('manufacturer-list', {title: 'Danh sách nhà cung ứng', listManufacturer: listManufacturer});
        res.redirect("/order-list")
      }
      Async_Await();
    }
  });
});

router.post('/good-trash-:id', function(req, res, next) {
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
        // let listManufacturer = await collectionManufacturer.find().toArray();
        // res.render('manufacturer-list', {title: 'Danh sách nhà cung ứng', listManufacturer: listManufacturer});
        res.redirect("/order-list")
      }
      Async_Await();
    }
  });
});

router.get('/order-edit-:id', function(req, res, next) {
  var id = req.params.id;
  var object_id = new ObjectId(id);
  console.log(object_id)

  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    if(err){
      console.log(err);
    }
    else{
      const collectionOrder = client.db("shoppingdb").collection("Order");
      const collectionProduct = client.db("shoppingdb").collection("Product");
      let order = collectionOrder.find({ _id: object_id}).sort().toArray().then(orderList => {
        let products = []
        let productNumber = orderList[0].Products.length
        let flag = 0
        orderList[0].Products.forEach(element => {
            let product = collectionProduct.find({_id: element.id}).sort().toArray().then(items => {
              client.close();
              console.log(items)
              products.push({
                product: items[0],
                amount: element.amount
              })
              flag ++
              if (flag === productNumber) {
                console.log(products)
                res.render('order-edit', {title: 'Chi tiết đơn đặt hàng', listProduct: products, object_id: object_id})
              }
            }).catch(err => console.error(`Failed to find documents: ${err}`))
        })
      });
    }
  });
});

module.exports = router;
