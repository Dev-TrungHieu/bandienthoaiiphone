const validate = require("../validation/validateLoginResign");
const express = require("express");
const router = express.Router();
const products = require("../models/schemaProduct");
const controllerShop = require("../controllers/controllerShop");

router.get("/", controllerShop.Home);
router.get("/login", validate.Login);
router.get("/resign", validate.Resign);
router.get("/check", validate.check);
router.get("/logout", validate.Logout);
router.get("/information", validate.information);
router.get("/changepassword", validate.changepassword);
router.get("/orderhistory", validate.orderHistory);
router.get("/orderhistory/:id", validate.viewOrderhistory);
router.get("/deleteOrder/:id", validate.deleteOrder);

router.post("/resign", validate.doResign);
router.post("/login", validate.checkLogin);
router.post("/update_infomation", validate.update_information);
router.post("/doChangepassword", validate.doChangepassword);
router.post("/cart/:id", validate.cart);
router.post("/updateCart", validate.updateCart);
router.get("/deleteCart/:id", validate.deleteCart);
router.get("/placeOrder", validate.placeOrder);
router.post("/createOrder", validate.createOrder);

module.exports = router;