# ShopingCartAPI
Simple Web API to create a basic shopping cart. 
<hr>




Available API commands 

https://warm-badlands-85769.herokuapp.com 

'/products'
=> return all the products currently present in inventory  


'/products/{specific_item}'
=> returns an individual product from inventoy 


'/products/{specific_name}?add=true'
=> adds the following the item to your shopping cart and returns its contents. 


'/completeOrder'
=> Decreases quantity of every item in the shopping cart by 1
   if quantitiy becomes 0 , the product is removed entirely 
   Shopping cart is emptied 
   
 
**Note: Database URI is stored in heroku environment variable, such that the API key does not reside on public respository



[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/1730c56bae8c26b06bf3)
