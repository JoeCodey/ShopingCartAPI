const mongodb = require('mongodb') ;


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

  songs.insert(seedData, function(err, result) {

   if(err) throw err;

 });


});
