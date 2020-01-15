const mongoose = require("mongoose");
const schema = mongoose.Schema;

const order = new schema({
    date: Date,
    status: Number,
    products: [],
    userId: String,
    total: Number,
    saleTotal: Number
});

var Order = mongoose.model("Order", order, "orders");
module.exports = Order;