const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    ntf: String,
    id: String,
    productName: String,
    category: String,
    stock: Number,
    price: Number
});

module.exports = mongoose.model('Products', productsSchema);