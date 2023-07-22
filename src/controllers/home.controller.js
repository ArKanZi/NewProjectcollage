const productService = require('../services/product.service');

function home(req, res){
    productService.getProduct().then(
        productList => {
            //console.log(productList[1]);
            res.render('dashboard', {title: 'dashboard', product: productList})
        }
    ).catch(
        error => {
            console.log(error);
            res.render('dashboard', {title: 'dashboard', product: [] })
        }
    )
}

function about(req, res){
    res.render('other/about', {title: 'About Page',});
}

function product(req, res){
    res.render('product/product', {title: 'Shop'});
}

function cart(req, res){
    res.render('cart/cart', {title: 'Cart'});
}

function contact(req, res){
    res.render('other/contact', {title: 'Contact'});
}

module.exports = {
    home, 
    about,
    product,
    cart,
    contact
}