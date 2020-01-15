const express = require("express");
const router = express.Router();
const controllerAdmin = require("../controllers/controllerAdmin");
const checkAdmin = require("../validation/checkAdmin");
const multer = require('multer');
const upload = multer({ dest: "./uploads" });

// Logout

router.get("/outLogin", controllerAdmin.outLogin);

// Category

router.get("/category", checkAdmin.checkAdmin, controllerAdmin.category);
router.get("/category/add", checkAdmin.checkAdmin, controllerAdmin.addCategory);
router.post("/category/add", checkAdmin.checkAdmin, controllerAdmin.doAddCategory);
router.get("/category/update/:id", checkAdmin.checkAdmin, controllerAdmin.updateCategory);
router.post("/category/update", checkAdmin.checkAdmin, controllerAdmin.doUpdateCategory);
router.get("/category/delete/:id", checkAdmin.checkAdmin, controllerAdmin.deleteCategory);

// Product

router.get("/product", checkAdmin.checkAdmin, controllerAdmin.product);
router.get("/product/add", checkAdmin.checkAdmin, controllerAdmin.addProduct);
router.post("/product/add", checkAdmin.checkAdmin, upload.any("fileProduct"), controllerAdmin.doAddProduct);
router.get("/product/update/:id", checkAdmin.checkAdmin, controllerAdmin.updateProduct);
router.post("/product/update", checkAdmin.checkAdmin, upload.any("fileProduct"), controllerAdmin.doUpdateProduct);
router.get("/product/delete/:id", checkAdmin.checkAdmin, controllerAdmin.deleteProduct);

// Blog

router.get("/blog", checkAdmin.checkAdmin, controllerAdmin.blog);
router.post("/blog/add", checkAdmin.checkAdmin, upload.any("file"), controllerAdmin.doAddBlog);

// Order

router.get("/home", checkAdmin.checkAdmin, controllerAdmin.home);
router.get("/order/accept/:id", checkAdmin.checkAdmin, controllerAdmin.accept_Order);
router.get("/order/delete/:id", checkAdmin.checkAdmin, controllerAdmin.delete_Order);
router.get("/order/view/:id", checkAdmin.checkAdmin, controllerAdmin.viewOrder);

// User

router.get("/contact", checkAdmin.checkAdmin, controllerAdmin.contact);
router.get("/viewUser/:id", checkAdmin.checkAdmin, controllerAdmin.viewUser);
router.post("/updateUser", checkAdmin.checkAdmin, controllerAdmin.updateUser);
router.get("/deleteUser/:id", checkAdmin.checkAdmin, controllerAdmin.deleteUser);

module.exports = router;
