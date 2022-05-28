const Products = require('../model/productsModel');

function productsController() {
    async function getProducts(req,res) {
        const products = await Products.find();
        res.json(products)
    }

    return {getProducts};
}

module.exports = productsController;