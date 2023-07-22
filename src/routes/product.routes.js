const express = require('express');
const productRouter = express.Router();

const productCtrl = require('../controllers/product.controller');


productRouter.get('/shop', productCtrl.product);
productRouter.get('/product-detail:product_Id', productCtrl.productdetail);
productRouter.get('/product-add', productCtrl.productAdd);
productRouter.post('/createProduct', productCtrl.uploadBannerPath, productCtrl.createProduct);



module.exports = productRouter;