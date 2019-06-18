var express = require('express');
const MongoClient = require('mongodb').MongoClient;
var router = express.Router();

const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.mongodb.net/test?retryWrites=true&w=majority";

router.get('/', function(req, res, next) {
    MongoClient.connect(uri, {useNewUrlParser: true}, function(err, DB){
        if(err) console.log(err);
        else{
            const orderCollection = DB.db('shoppingdb').collection('Order');
            let Async_Await = async()=>{
                let total19 = 0, total13=0, total14=0, total15=0,total16=0,total17=0,total18=0,total20=0;
                const regex13 = new RegExp(escape("2013"), 'gi');
                const regex14 = new RegExp(escape("2014"), 'gi');
                const regex15 = new RegExp(escape("2015"), 'gi');
                const regex16 = new RegExp(escape("2016"), 'gi');
                const regex17 = new RegExp(escape("2017"), 'gi');
                const regex18 = new RegExp(escape("2018"), 'gi');
                const regex19 = new RegExp(escape("2019"), 'gi');
                const regex20 = new RegExp(escape("2020"), 'gi');
                let or13 = await orderCollection.find({OrderDate: regex13});
                await or13.forEach(element => {
                  total13= total13 + element.Sum;
                });
                let or14 = await orderCollection.find({OrderDate: regex14});
                await or14.forEach(element => {
                  total14 = total14 + element.Sum;
                });
                let or15 = await orderCollection.find({OrderDate: regex15});
                await or15.forEach(element => {
                  total15 = total15 + element.Sum;
                });
                let or16 = await orderCollection.find({OrderDate: regex16});
                await or16.forEach(element => {
                  total16 = total16 + element.Sum;
                });
                let or17 = await orderCollection.find({OrderDate: regex17});
                await or17.forEach(element => {
                  total17 = total17 + element.Sum;
                });
                let or18 = await orderCollection.find({OrderDate: regex18});
                await or18.forEach(element => {
                  total18 = total18 + element.Sum;
                });
                let or19 = await orderCollection.find({OrderDate: regex19});
                await or19.forEach(element => {
                  total19 = total19 + element.Sum;
                });
                let or20 = await orderCollection.find({OrderDate: regex20});
                await or20.forEach(element => {
                  total20 = total20 + element.Sum;
                });
                DB.close();
                res.render('index', { title: 'Trang chủ', 'user': req.user, 'total13': total13, 
                                                                            'total14': total14, 
                                                                            'total15': total15, 
                                                                            'total16': total16, 
                                                                            'total17': total17, 
                                                                            'total18': total18, 
                                                                            'total19': total19, 
                                                                            'total20': total20 });
            }
            Async_Await();
        }
    })
})

module.exports = router;
