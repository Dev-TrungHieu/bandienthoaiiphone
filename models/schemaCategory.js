const mongoose = require("mongoose");
const schema = mongoose.Schema;

var product = new schema({
    name: String,
    key: String,
    date: Date,
    description: String
});

var Categorys = mongoose.model("Categorys", product , "categorys");
module.exports = Categorys;
