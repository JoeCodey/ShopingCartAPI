var {mongoose} = require('./db/mongoose') ;

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
