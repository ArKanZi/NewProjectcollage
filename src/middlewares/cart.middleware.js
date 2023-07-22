const cartService = require('../services/cart.service');
function cartMiddleware(req, res, next){
    cartService.cartService().then(
        cartList => {
             res.locals.cart = cartList;
        }
    ).catch(
        error => {
            console.log(error);
            res.render('cart/cart', {title: 'Edit product', product: "Error From Middle Ware" })
        }
    )
    //console.log("Middleware is working");
        
        //console.log(cart11);
        next();
}


module.exports = cartMiddleware;