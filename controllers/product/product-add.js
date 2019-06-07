var express = require('express');
var router = express.Router();
const path = require('path');
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.gcp.mongodb.net/test?retryWrites=true";
var multer = require("multer");
// const handleError = (err, res) => {
//   res
//     .status(500)
//     .contentType("text/plain")
//     .end("Lỗi!");
// };

const storage = multer.diskStorage({
  destination: './public/images/product',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
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
  var filename = req.file.filename;

  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    if(err){
      console.log(err);
    }
    else{
      const collectionProduct = client.db("shoppingdb").collection("Product");
      const pro = ({
        Image: filename,
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
        client.close();
        console.log('product is added')
      })
      res.redirect('/product-list');
    }
  });
});

module.exports = router;
