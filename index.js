const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookiePaser = require("cookie-parser");
const routerShop = require("./routers/routerShop");
const routerAdmin = require("./routers/routerAdmin");
const validateLR = require("./routers/routerValidate");
const sessionid = require("./validation/session");
// const session = require('express-session');

const port = process.env.PORT || 3000;
mongoose.connect("mongodb+srv://admin:admin@rest-ytb-3e3xb.mongodb.net/QLBH", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

app.set('view engine', 'ejs');
app.set('views', ['./views/pages', './views/admin']);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/resource", express.static(__dirname + '/resource'));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/public", express.static(__dirname + "/public"));
app.use(cookiePaser());
app.use(sessionid);
// app.use(session({ secret: 'khanh cho', cookie: { maxAge: 60000 }}))

app.use('/shop', routerShop);
app.use('/admin', routerAdmin);
app.use("/", validateLR);

app.listen(port);