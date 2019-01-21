var mongoose = require('mongoose') ;


var Products = mongoose.model('Products',{
  title: String ,
  price: Number,
  quantity: Number
});

module.exports = {Products} ;
