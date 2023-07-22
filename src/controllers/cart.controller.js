const cartService = require('../services/cart.service');
const updateEvent = require('../event/updateCart.event');

// function cart(req, res){
//     res.render('cart/cart', {title: 'cart Page'});
// }
function addCart(req, res){
    //console.log(productId);
    cartService.addCartService().then(
        productList => {
            res.render('cart/cart', {title: 'Edit product'})

        }
    ).catch(
        error => {
            console.log(error);
            res.render('cart/cart', {title: 'Edit product', product: [] })
        }
    )
}

function cart(req, res){
    //console.log(productId);
    cartService.cartService().then(
        cartList => {
            res.render('cart/cart', {title: 'Edit product', cart: cartList})
             cart1 = cartList;
             

        }
    ).catch(
        error => {
            console.log(error);
            res.render('cart/cart', {title: 'Edit product', product: [] })
        }
    )
}


function getCart(req, res){
    const productId = req.params.product_Id
    //console.log(productId);
    cartService.getCartService().then(
        productList => {
            //console.log(productList);
            const productLIST = productList.find((productdetail) => productdetail.ProductId == productId)
            cartService.addCartService(productLIST);
            
            //res.render('cart/cart', {title: 'Edit product', product: productLIST})
            res.redirect('/shop')

        }
    ).catch(
        error => {
            console.log(error);
            res.render('cart/cart', {title: 'Edit product', product: [] })
        }
    )
}
function about(req, res){
    cartService.cartService().then(
        cartList => {
            res.render('other/about', {title: 'About Page', cart: cartList})

        }
    ).catch(
        error => {
            console.log(error);
            res.render('cart/cart', {title: 'About Page', product: [] })
        }
    )
}
function contact(req, res){
    cartService.cartService().then(
        cartList => {
            res.render('other/contact', {title: 'Contact Page', cart: cartList})

        }
    ).catch(
        error => {
            console.log(error);
            res.render('cart/cart', {title: 'About Page', product: [] })
        }
    )
}

module.exports = {
    cart,
    getCart,
    addCart,
    about,
    contact
}
