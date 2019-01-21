const express = require('express') ;
const fs = require('fs') ;
var {mongoose} = require('./db/mongoose') ;
var {Products} = require('./models/products') ;
var current_cart = require('./models/current_cart') ;

//const MongoClient = require('mongodb').MongoClient ;
//const Moongoose = require('mongoose ')

var app = express() ;
const port = process.env.PORT || 5000 ;


//Middleware - log requests
app.use((req,res,next) => {
  var now = new Date().toString() ;
  var log = `${now}:${req.method} ${req.url}` ;
  console.log(log);
  fs.appendFile('server.log',log + '\n', (err) =>{
    if(err){
      console.log('Unable to append to server.log');
    }
  }) ;
  next();
});


let seedData = [
  {
    title: 'Bicycle',
    price: 200,
    quantity: 2
  },
  {
    title: 'Helmet',
    price: 50,
    quantity: 5
  },
  {
    title: 'Knee pads',
    price: 25,
    quantity: 10
  }
] ;

//Middleware to seed the database with some product entries

app.use((req,res,next)=>{
  var seedEntries = new Products(seedData);
  seedEntries.save(seedData).then(()=>{
    console.log('*** Saving initial seed entries') ;
  }).catch((e)=>{
    console.log('Unable to save seed data\n'+e) ;
  });
});



console.log('/***********    uri mlab is: ' + uri )

MongoClient.connect(uri, function(err, client) {



  if(err) {
    return console.log("Unable to connect to mongodb server") ;
  }

  console.log("Connecting to MongoDB") ;

 db = client.db('shopping_api') ;
  /*
   * Get the database from the client. Nothing is required to create a
   * new database, it is created automatically when we insert.
   */

   db.collection('products').findOne({},(err, result) => {
     console.log("Testprobe of Database: "+JSON.stringify(result,undefined,2)) ;
   });


  /*
   * First we'll add a few songs. Nothing is required to create the
   * songs collection; it is created automatically when we insert.
   */

 //  let products = db.collection('products');
 //
 //  products.insert(seedData, function(err, result) {
 //
 //   if(err) throw err;
 //
 // });


});


app.get('/products/:id',function(req,res){
    var id = req.params.id ;
    console.log("**** id: "+id) ;
    Products.findOne({title: id}).then((product)=>{
      console.log(product) ;
      res.send(product) ;
    }).catch((e)=>{
      res.status(400).send() ;
    }) ;
});

app.get('/', (req,res)=>{
  res.send('<h1>Found Home page<\h>') ;
})

app.get("/products", function(req,res){

  console.log('**** route /products') ;
    Products.find().then((results) =>{
      res.send(results) ;
    },(e) => {
      res.status(400).send(e) ;
    });
    //db.collection("products").find({}).toArray( function(err, results) {

    //console.log("/pr")
  //  res.send(results) ;

  }) ;
//
// app



app.listen(port, ()=>{
  console.log(`Server is up on Port ${port} at `);
}) ;

module.exports = {app} ;

// var gracefulShutdown= function(){
//   MongoClient.
// }



// This will handle process.exit():
// process.on('exit', gracefulShutdown);
//
// // This will handle kill commands, such as CTRL+C:
// process.on('SIGINT', gracefulShutdown);
// process.on('SIGTERM', gracefulShutdown);
// process.on('SIGKILL', gracefulShutdown);
