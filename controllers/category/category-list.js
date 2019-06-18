var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.mongodb.net/test?retryWrites=true&w=majority";

router.get('/category-list', function(req, res, next){
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    if(err){
      console.log(err);
    }
    else{
      const collectionCategory = client.db("shoppingdb").collection("Category");
      let Async_Await = async()=>{
        let category_list = await collectionCategory.find({}).toArray();
        client.close();
        res.render('category-list', {title: 'Category List', 'category_list': category_list, 'user': req.user});
      }
      Async_Await();
    }
  });
});

router.post('/delete-category-:id', function(req, res, next){
  var id = req.params.id;
  var object_id = new ObjectId(id);
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    if(err){
      console.log(err);
    }
    else{
      const collectionCategory = client.db("shoppingdb").collection("Category");
      collectionCategory.remove({"_id": object_id}, function(err, res){
        client.close();
        if(err){
          console.log(err);
        }
        else{
          console.log("category is deleted");
        }
      });
      res.redirect('/category-list');
    }
  });
});

module.exports = router;
