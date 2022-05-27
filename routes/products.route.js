const { Router } = require('express');
const productsController = require('../controllers/productsController')();

function productsRouter() {
    const routes = Router();

    routes
        .route('/')
        .get(productsController.getProducts);
    
    return routes;
}

module.exports = productsRouter();