const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const it = new Schema({
    name: String,
    cost: Number,
    key: String,
    count: Number,
    sale: Number,
    saleCost: Number,
    date: Date,
    description: String,
    categoryId: String,
    images: []
})

const Products = mongoose.model("Products", it, "products");
module.exports = Products;