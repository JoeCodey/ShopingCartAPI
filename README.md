# ShopingCartAPI
Simple Web API to create a basic shopping cart. 
<hr>




**Available API commands (Postamn Collection posted below for easy testing

App hosted @ https://warm-badlands-85769.herokuapp.com 

'/products'
=> return all the products currently present in inventory  
https://warm-badlands-85769.herokuapp.com/products 



'/products/{specific_item}'
=> returns an individual product from inventoy <br />
https://warm-badlands-85769.herokuapp.com/products/Helmet



'/products/{specific_name}?add=true'
=> adds the following the item to your shopping cart and returns its contents. <br />
https://warm-badlands-85769.herokuapp.com/products/Bicycle?add=true 


'/completeOrder'
=> Decreases quantity of every item in the shopping cart by 1 <br />
   if quantitiy becomes 0 , the product is removed entirely <br />
   Shopping cart is emptied <br />
   
https://warm-badlands-85769.herokuapp.com/completeORder 
   
 
**Note: Database URI is stored in heroku environment variable, such that the API key does not reside on public respository



[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/1730c56bae8c26b06bf3)
