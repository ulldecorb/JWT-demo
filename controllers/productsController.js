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

  // async function getById(req, res) {
  //   try {
  //     const productsID = await Products.findById(
  //       req.params.productsID
  //     );
  //     res.json(productsID);
  //   } catch (error) {
  //     res.status(404);
  //     res.send(error);
  //   }
  // }

  // async function updateById(req, res) {
  //   try {
  //     const updatedProducts = await Products.findByIdAndUpdate(
  //       req.params.productsID,
  //       req.body,
  //       { new: true }
  //     );
  //     res.json(updatedProducts);
  //   } catch (error) {
  //     res.send(error);
  //   }
  // }

  // async function deleteById(req, res) {
  //   try {
  //     await Products.findByIdAndDelete(req.params.productsID);
  //     res.status(204);
  //     res.json();
  //   } catch (error) {
  //     res.send(error);
  //   }
  // }

    return {getProducts,createOne};
}

module.exports = productsController;