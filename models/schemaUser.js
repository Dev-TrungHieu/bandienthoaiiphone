const mongoose = require("mongoose");
const schema = mongoose.Schema;

var user = new schema({
    username: String,
    password: String,
    name: String,
    fullname: String,
    address: String,
    phone: String,
    email: String,
    date: Date
});

var Users = mongoose.model("Users", user, "users");
module.exports = Users;