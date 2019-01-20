const mongodb = require('mongodb') ;
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

console.log('/***********    uri mlab is: ' + uri )

mongodb.MongoClient.connect(uri, function(err, client) {


  if(err) throw err;

  /*
   * Get the database from the client. Nothing is required to create a
   * new database, it is created automatically when we insert.
   */

  let db = client.db('shopping_api') ;

  /*
   * First we'll add a few songs. Nothing is required to create the
   * songs collection; it is created automatically when we insert.
   */

  let products = db.collection('products');

  products.insert(seedData, function(err, result) {

   if(err) throw err;

 });


});

app.listen(port, ()=>{
  console.log(`Server is up on Port ${port} at `);
}) ;
