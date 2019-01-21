module.exports = function Cart() {
  this.items = [] ;
  this.totalQty = 0 ;
  this.totalPrice = 0 ;

  this.add = function(item, id){

    items.push({id: id, title: item}) ;

  }


}
