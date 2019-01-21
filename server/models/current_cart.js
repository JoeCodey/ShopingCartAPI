module.exports = {
  items: [] ,
  totalQty:  0 ,
  totalPrice : 0 ,


  add : function(id, title, price){


    this.totalPrice += price ;
    this.totalQty += 1 ;
    this.items.push({_id: id, title: title});

  }

  // remove : function(id, title, price){
  //
  //
  //   this.totalPrice -= price ;
  //   if(this.totalQty>0){
  //   this.totalQty -= 1 ;
  //   }
  //   this.items.find({id: id, title: title});
  //
  // }



};
