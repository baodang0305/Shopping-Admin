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
    const collectionOrder = client.db("shoppingdb").collection("Order");
    const collectionProduct = client.db("shoppingdb").collection("Product");
    let Async_Await = async()=>{
        let array = await collectionProduct.find().toArray();
        console.log(array)
        let goodArray = []
        let sum = 0
        array.forEach(element => {
          let amount = Math.floor(Math.random() * 10)
          goodArray.push({
            id: element._id,
            amount: amount
          })
          sum += element.Cost*amount
        });
        console.log(creater.createOrder(goodArray, sum))
        collectionOrder.insert(creater.createOrder(goodArray, sum), function(err, res){
          console.log("order are created ")
        });
    }
    Async_Await();
  }
});
