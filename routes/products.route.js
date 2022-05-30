const { Router } = require('express');
const productsController = require('../controllers/productsController')();

function productsRouter() {
    const routes = Router();

    routes
        .route('/')
        .get(productsController.getProducts)
        .post(productsController.createOne);
    
    return routes;
}

module.exports = productsRouter();