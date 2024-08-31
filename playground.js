// Tasks:

// Create a Cart class that allows users to:
// Add items to the cart with a name, quantity, and price.
// Remove items by name.
// Calculate the total price of all items in the cart.
// Display the list of items in the cart.
// Implement validation so users can't add an item with invalid data (e.g., negative quantities or prices).


const maintainCart=()=> {

    let cart=[];
    
    // add item into cart
    function addItem(name ='product Name', quantity, price){
        if(quantity <1 ){
            return "quantity cant be nagitive number or zero"
        }
        if(!price){
            return 'price cant be a falsy value'

        }
        let createProductForCart={
            name,
            quantity,
            price
        }
        cart.push(createProductForCart)
        return cart
    }

    // removing items by name

    function removingItems(productName){
        let productToRemoved=productName.toLowerCase()
        let length= cart.length;
        let isDeleted =true;

        if(cart.length<1){
            return 'your cart is empty'
        }
  

        for(let i =0; i<length; i++){
            if(cart[i].name.toLowerCase()=== productToRemoved){
              let deletedProduct = cart.splice(i,1);
              
                return {
                    deletedProduct,
                    cart,
                    message:`the product named ${productName} is removed from the cart`
                }
            }
            else{
                isDeleted=false
            }
            
        }
        if(!isDeleted){
            return{
                cart,
                message:`${productToRemoved} is not in the cart, please make sure you have enter a valid product name`
            }
        }
        
    }

    // calculate total price

    function calculateTotalPriceOfCart(){
      let totalPrice=0;
       if(cart.length){
        for (let i = 0; i < cart.length; i++) {
            
            let totalPriceOfSingleProduct= cart[i].price*cart[i].quantity

            totalPrice= totalPrice+totalPriceOfSingleProduct
           
        }
       }
       return totalPrice
    }

    // update product information

    function updateProductInformation(name,{price,quantity}){

        for(let i=0; i<cart.length;i++){
            if(cart[i].name.toLowerCase()=== name.toLowerCase()){
               cart[i]={
                name,
                price,
                quantity
               }
            }

        }
        return {
            cart,
            message:`${name} is updated`
        }

    }

    return{
        cart,
        addItem,
        removingItems,
        calculateTotalPriceOfCart,
        updateProductInformation
    }
    
}

const productCart = maintainCart()

productCart.addItem("keyboard",6,12)
productCart.addItem("mouse",20,7)
productCart.addItem("Monitor",4,200)

const price= productCart.calculateTotalPriceOfCart()
const removingItem=productCart.removingItems('laptop')
const updateProduct =productCart.updateProductInformation('Monitor', {price:200,quantity:10})
console.log(updateProduct)




