const controllerShop = require("../controllers/controllerShop");
const express = require("express");
const router = express.Router();

router.get("/home", controllerShop.Home);
router.get("/blog", controllerShop.Blog);
router.get("/checkout", controllerShop.Checkout);
router.get("/contact", controllerShop.Contact);
router.get("/product", controllerShop.Shop);
router.get("/regular", controllerShop.Regular);
router.get("/blogs/:id", controllerShop.Single_blog);
router.get("/detail/:id", controllerShop.Single_product);
router.get("/search", controllerShop.Search);

module.exports = router;