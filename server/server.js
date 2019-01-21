const express = require('express') ;
const fs = require('fs') ;
var {mongoose} = require('./db/mongoose') ;
var {Products} = require('./models/products') ;
var current_cart = require('./models/current_cart') ;

//const MongoClient = require('mongodb').MongoClient ;
//const Moongoose = require('mongoose ')

var app = express() ;
app.use(express.static(__dirname+'/public'));
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

// app.use((req,res,next)=>{
//   var seedEntries = new Products(seedData);
//   seedEntries.save(seedData).then(()=>{
//     console.log('*** Saving initial seed entries') ;
//   }).catch((e)=>{
//     console.log('Unable to save seed data\n'+e) ;
//   });
// });



//console.log('/***********    uri mlab is: ' + uri )

app.get('/products/:id',function(req,res){
    var id = req.params.id ;
    var addToCart = req.query.add ;

    console.log("**** id: "+id) ;
    Products.findOne({title: id}).then((product)=>{
      //If add=true, and item is in stock then add item to the current cart.
      if(addToCart){
        //console.log('addtoCart: '+addToCart) ;
        current_cart.add(product._id,product.title,product.price);
        res.send(JSON.stringify(current_cart));
      }else{
          res.send(product);

      }
    }).catch((e)=>{
      console.log(e);
      res.status(400).send() ;
    }) ;
});

app.get('/view_cart',(req,res)=>{
    res.send(JSON.stringify(current_cart));
});

/* Removes all items from cart,
*  decreases quantity of the appropriate items in the inventory
*  removes items with zero inventory remaining.
*/
app.get('/completeOrder',(req,res)=>{


    var emptyCart = (callback) => {

    current_cart.items.forEach( (purchased_product)=>{
      console.log(JSON.stringify(purchased_product,undefined,2));
      // Lot asynchonous calls here, there should be a better way to do this.
      Products.findById(purchased_product._id).then((product)=>{
          console.log(product.title+' quantity: '+product.quantity) ;

          if(product.quantity ===1){
            // delete this product as it is no longer in inventory
            Products.deleteOne({
               _id: product._id}).exec(function(err, user) {
              console.log("deleted "+product.title +" w/id: "+product._id) ;
            });
          }else{

          Products.update({
            _id: product._id
          }, {
            $inc: {
              quantity: -1
            }
          }).exec(function(err, user) {
            console.log("Decrease quanity of "+product.title+" to "+product.quantity);
          }) ;

        }
          // if(product.quantity === 1){
          //   Products.findByIdAndDelete(purchased_product._id);
          // }else{
          //   Products.findByIdAndUpdate(purchased_product._id,{$inc: {quantity: -1}});
          // }
      }).catch((e)=>{
          res.status(400).send(e);
      });
    });

    return callback() ;

  }

  emptyCart(()=>{
    // Empty the current cart
    current_cart.items = [];
    current_cart.totalQty = 0 ;
    current_cart.totalPrice = 0 ;
    //Send back the remain items in the store as response
    Products.find().then((results) =>{

      res.send(results) ;
    },(e) => {
      res.status(400).send(e) ;
    });
  }) ;




});

app.get('/', (req,res)=>{
  res.send('<h1>ShopingCartAPI</h1><hr><p>see Github <a href="https://github.com/JoeCodey/ShopingCartAPI/blob/master/README.md">Readme </a> for testing details</p>') ;
});

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





app.listen(port, ()=>{
  console.log(`Server is up on Port ${port} at `);
}) ;

module.exports = {app} ;

//Monogo default driver connection, usefull for seeding data into the database

// MongoClient.connect(uri, function(err, client) {
//
//
//
//   if(err) {
//     return console.log("Unable to connect to mongodb server") ;
//   }
//
//   console.log("Connecting to MongoDB") ;
//
//  db = client.db('shopping_api') ;
//   /*
//    * Get the database from the client. Nothing is required to create a
//    * new database, it is created automatically when we insert.
//    */
//
//    db.collection('products').findOne({},(err, result) => {
//      console.log("Testprobe of Database: "+JSON.stringify(result,undefined,2)) ;
//    });
//
//
//   /*
//    * First we'll add a few songs. Nothing is required to create the
//    * songs collection; it is created automatically when we insert.
//    */
//
//  //  let products = db.collection('products');
//  //
//  //  products.insert(seedData, function(err, result) {
//  //
//  //   if(err) throw err;
//  //
//  // });
//
//
// });

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
