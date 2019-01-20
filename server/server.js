var mongoose = require('mongoose') ;

const uri = process.env.MONGOLAB_URI  ;

mongoose.Promise = global.Promise ; 
mongoose.connect(uri);

var Schema = mongoose.Schema ;

var productInventory = new Schema({
  title: String ,
  price: Number,
  quantity: Number
}) ;

var newProductInventory = new productInventory({
  title: "mountain bike" ,
  price: 600,
  quantity: 1

}) ;
