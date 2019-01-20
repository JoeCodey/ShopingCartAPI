var mongoose = require('mongoose') ; 


var products = mongoose.model('Products',{
  title: String ,
  price: Number,
  quantity: Number
});
