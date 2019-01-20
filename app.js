const MongoClient = require('mongodb').MongoClient ;
const Moongoose = require('mongoose ')
const express = require('express') ;
const fs = require('fs') ;

var app = express() ;

const port = process.env.PORT || 3000 ;


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
    Title: 'Bicycle',
    price: 200,
    quantity: 2
  },
  {
    Title: 'Helmet',
    price: 50,
    quantity: 5
  },
  {
    Title: 'Knee pads',
    price: 25,
    quantity: 10
  }
]



let uri = process.env.MONGOLAB_URI ;

var db ;

//console.log('/***********    uri mlab is: ' + uri )

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

mongoose.Promise = global.Promise ;
mongoose.connect(uri);



app.get('/products/:productTitle',function(req,res){
    res.send(req.params) ;
});

app.get("/products", function(req,res){
  console.log('**** route /products') ;
    db.collection("products").find({}).toArray( function(err, results) {
    if (err) throw err;
    //console.log("/pr")
    res.send(results) ;

  }) ;
} );
//
// app



app.listen(port, ()=>{
  console.log(`Server is up on Port ${port} at `);
}) ;

var gracefulShutdown= function(){
  MongoClient.
}



// This will handle process.exit():
process.on('exit', gracefulShutdown);

// This will handle kill commands, such as CTRL+C:
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGKILL', gracefulShutdown);
