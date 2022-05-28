const Products = require('../model/productsModel');

function productsController() {
    async function getProducts(req,res) {
        const products = await Products.find();
        res.json(products)
    }

    async function createOne(req, res) {
    const newProducts = new Products(req.body);
    try {
      await newProducts.save();
      res.json(newProducts);
    } catch (error) {
      res.send(error); 
    }
  }

    return {getProducts,createOne};
}

module.exports = productsController;