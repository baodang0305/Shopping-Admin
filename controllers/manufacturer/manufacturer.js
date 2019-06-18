var express = require('express');
var router = express.Router();
var ObjectId = require("mongodb").ObjectID;
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.mongodb.net/test?retryWrites=true&w=majority";


router.get('/manufacturer-list', function(req, res, next) {
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, DB) {
    if(err){
      console.log(err);
    }
    else{
      const collectionManufacturer = DB.db("shoppingdb").collection("Manufacturer");
      let Async_Await = async()=>{
          let listManufacturer = await collectionManufacturer.find().toArray();
          DB.close();
          res.render('manufacturer-list', {title: 'Danh sách nhà cung ứng', 'listManufacturer': listManufacturer, 'user': req.user});
      }
      Async_Await();
    }
  });
});

router.get('/manufacturer-add', function(req,res){
  res.render('manufacturer-add', {title: "Thêm nhà sản xuất", 'user': req.user});
})

router.get('/manufacturer-detail-:id', function(req, res, next) {
  var id = req.params.id
  var object_id = new ObjectId(id);
  MongoClient.connect(uri, {useNewUrlParser: true}, function(err, DB){
    if(err) console.log(err);
    else{
      const manufacturerCollection = DB.db('shoppingdb').collection('Manufacturer');
      let Async_Await = async() =>{
        let manufacturer = await manufacturerCollection.findOne({_id: object_id});
        res.render('manufacturer-edit', {title: 'Cập nhật nhà cung cấp', 'manufacturer': manufacturer, 'user': req.user});
      }
      Async_Await();
    }
  })
});

router.post('/edit-manufacturer-:id', function(req, res){
  var name = req.body.Name;
  var address = req.body.Address;
  var phone = req.body.Phonenumber;
  var des = req.body.Description;
  var id = req.params.id

  var object_id = new ObjectId(id);
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, DB) {
    if(err){
      console.log(err);
    }
    else{
      const collectionManufacturer = DB.db("shoppingdb").collection("Manufacturer");
      collectionManufacturer.updateOne({_id: object_id}, {$set:{ Name: name, Address: address, PhoneNumber: phone, Description: des}});
      DB.close();
      res.redirect("/manufacturer-list")
    }
  })
});

router.post('/add-manufacturer', function(req, res){
  var name = req.body.name;
  var address = req.body.address;
  var phone = req.body.phone;
  var des = req.body.des;
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, DB) {
    if(err){
      console.log(err);
    }
    else{
      const collectionManufacturer = DB.db("shoppingdb").collection("Manufacturer");
        collectionManufacturer.insertOne({ Name: name, Address: address, PhoneNumber: phone, Description: des})
        DB.close();
        res.redirect("/manufacturer-list")
    }
  })
})

router.post('/manufacturer-trash-:id', function(req, res, next) {
  var id = req.params.id;
  var object_id = new ObjectId(id);

  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, DB) {
    if(err){
      console.log(err);
    }
    else{
      const collectionManufacturer = DB.db("shoppingdb").collection("Manufacturer");
      collectionManufacturer.deleteOne({_id: object_id});
      DB.close();
      res.redirect("/manufacturer-list")
    }
  });
});

module.exports = router;
