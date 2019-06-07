var express = require('express');
var router = express.Router();
var ObjectId = require("mongodb").ObjectID;
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.mongodb.net/test?retryWrites=true&w=majority";

/* GET home page. */
router.get('/manufacturer-edit-:id', function(req, res, next) {
  var id = req.params.id
  var object_id = new ObjectId(id);

  res.render('manufacturer-edit', {title: 'Chình sửa thông tin nhà cung ứng', object_id: object_id, create: false});
});

router.post('/commit:id', function(req, res, next){
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
        const collectionManufacturer = client.db("shoppingdb").collection("Manufacturer");
        let Async_Await = async()=>{
          await collectionManufacturer.save({ Name: name, Address: address, PhoneNumber: phone, Description: des})
          await collectionManufacturer.remove({_id: object_id});
          client.close();
          // let listManufacturer = await collectionManufacturer.find().toArray();
          // res.render('manufacturer-list', {title: 'Danh sách nhà cung ứng', listManufacturer: listManufacturer});
          res.redirect("/manufacturer-list")
        }
        Async_Await();
      }
    });
  } else {
    MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
      if(err){
        console.log(err);
      }
      else{
        const collectionManufacturer = client.db("shoppingdb").collection("Manufacturer");
        let Async_Await = async()=>{
          await collectionManufacturer.save({ Name: name, Address: address, PhoneNumber: phone, Description: des})
          client.close();
          // let listManufacturer = await collectionManufacturer.find().toArray();
          // res.render('manufacturer-list', {title: 'Danh sách nhà cung ứng', listManufacturer: listManufacturer});
          res.redirect("/manufacturer-list")
        }
        Async_Await();
      }
    });
  }
});

router.post('/commit', function(req, res, next){
  var name = req.body.name;
  var address = req.body.address;
  var phone = req.body.phone;
  var des = req.body.des;
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    if(err){
      console.log(err);
    }
    else{
      const collectionManufacturer = client.db("shoppingdb").collection("Manufacturer");
      let Async_Await = async()=>{
        await collectionManufacturer.save({ Name: name, Address: address, PhoneNumber: phone, Description: des})
        client.close();
        // let listManufacturer = await collectionManufacturer.find().toArray();
        // res.render('manufacturer-list', {title: 'Danh sách nhà cung ứng', listManufacturer: listManufacturer});
        res.redirect("/manufacturer-list")
      }
      Async_Await();
    }
  });
});

router.get('/manufacturer-create', function(req, res, next){
  res.render('manufacturer-edit', {title: 'Thêm nhà cung ứng', create: true});
});

router.post('/manufacturer-trash-:id', function(req, res, next) {
  var id = req.params.id;
  var object_id = new ObjectId(id);

  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    if(err){
      console.log(err);
    }
    else{
      const collectionManufacturer = client.db("shoppingdb").collection("Manufacturer");
      let Async_Await = async()=>{
        await collectionManufacturer.remove({_id: object_id});
        client.close();
        // let listManufacturer = await collectionManufacturer.find().toArray();
        // res.render('manufacturer-list', {title: 'Danh sách nhà cung ứng', listManufacturer: listManufacturer});
        res.redirect("/manufacturer-list")
      }
      Async_Await();
    }
  });
});

router.get('/manufacturer-list', function(req, res, next) {
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    if(err){
      console.log(err);
    }
    else{
      console.log("Successfully connected");
      const collectionManufacturer = client.db("shoppingdb").collection("Manufacturer");
      let Async_Await = async()=>{
        try {
          let listManufacturer = await collectionManufacturer.find().toArray();
          client.close();
          res.render('manufacturer-list', {title: 'Danh sách nhà cung ứng', listManufacturer: listManufacturer});
        } catch (err) {
          res.render('manufacturer-list', {title: 'Danh sách nhà cung ứng', listManufacturer: []});
          alert(err)
        }
      }
      Async_Await();
    }
  });
});

module.exports = router;
