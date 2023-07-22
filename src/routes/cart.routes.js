const express = require('express');
const cartRouter = express.Router();

const cartCtrl = require('../controllers/cart.controller');
cartRouter.use(require('../middlewares/cart.middleware'));

cartRouter.get('/cart', cartCtrl.cart);
cartRouter.get('/add-Cart:product_Id', cartCtrl.getCart);
cartRouter.post('/add-Cart:product_Id', cartCtrl.addCart);
cartRouter.get('/about', cartCtrl.about)
cartRouter.get('/contact', cartCtrl.contact)


module.exports = cartRouter;