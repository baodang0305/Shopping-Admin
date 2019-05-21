//require for mongo
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;

//require for Object of mongoose
const Manufacturer = require('./models/manufacturer');

const creater = require('./CreateData');

//Connect and Create database to Mongodb Atlas
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.gcp.mongodb.net/test?retryWrites=true";
// MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("Successfully connected");
//
//     //add manufacturer
//     const collectionManufacturer = client.db("shoppingdb").collection("Manufacturer");
//     console.log(creater.createManufacturer())
//     collectionManufacturer.insert(creater.createManufacturer(), function(err, res){
//       console.log("manufacturers are created ")
//     });
//   }
// });

MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
  if(err){
    console.log(err);
  }
  else{
    console.log("Successfully connected");

    //add manufacturer
    const collectionOrder = client.db("shoppingdb").collection("Order");
    console.log(creater.createOrder())
    collectionOrder.insert(creater.createOrder(), function(err, res){
      console.log("order are created ")
    });
  }
});
