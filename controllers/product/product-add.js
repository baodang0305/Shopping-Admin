var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const path = require('path');
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.gcp.mongodb.net/test?retryWrites=true";
const product = require("../../models/product");
var multer = require("multer");
// const handleError = (err, res) => {
//   res
//     .status(500)
//     .contentType("text/plain")
//     .end("Lỗi!");
// };

const storage = multer.diskStorage({
  destination: './public/images/man/shirt',
  filename: function(req, file, cb) {
    cb(null, 'shirt-man-1.jpg');
  }
});

var upload = multer({storage: storage}).single('Image');

router.get('/product-add', function(req,res, next){
  res.render('product-add', {title: 'Product Add'});
});

router.post('/add_product', upload, function(req, res, next){

  var name = req.body.Name;
  var cate = req.body.Category;
  var gender = req.body.Gender;
  var amount = req.body.Amount;
  var cost = req.body.Cost;
  var dis = req.body.Discount;
  var group = req.body.Product_Group;
  var des = req.body.Describe;

  console.log(req.file)

  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    if(err){
      console.log(err);
    }
    else{
      const collectionProduct = client.db("shoppingdb").collection("Product");
      const pro = new product({
        Image: 'hinhanhupload.png',
        Name: name,
        Category: cate,
        Gender: gender,
        Cost: cost,
        Discount: dis,
        Amount: amount,
        Describe: des,
        Product_Group: group
      });
      collectionProduct.insertOne(pro, function(err, res){
        console.log("product is added ");
      });
      res.redirect('/product-list');
    }
  });
});

module.exports = router;
