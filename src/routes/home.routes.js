const express = require('express');
const homeRouter = express.Router();

const homeCtrl = require('../controllers/home.controller');

homeRouter.use(require('../middlewares/auth.middleware'));
homeRouter.use(require('../middlewares/cart.middleware'));


homeRouter.get('/', homeCtrl.home);
//homeRouter.get('/about', homeCtrl.about);
//homeRouter.get('/contact', homeCtrl.contact);

module.exports = homeRouter;