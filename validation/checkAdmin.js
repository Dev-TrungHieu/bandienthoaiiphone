const products = require("../models/schemaProduct");

module.exports.checkAdmin = function (req, res, next) {
    var data = req.cookies.user;
    if (data == "admin") {
        
    } else {
        const arr = req.cookies.products;
        var obj = [];
        dem = 0;
        var total = 0;
        var saleTotal = 0;
        var len = 0;
        products.find({}).then(data => {
            if (arr) {
                data.forEach(function (i) {
                    arr.forEach(j => {
                        if (i._id == j.cart) {
                            obj[dem] = i;
                            total = total + i.cost * j.count;
                            saleTotal = saleTotal + i.saleCost * j.count;
                            dem = dem + 1;
                            len = len + j.count;
                        }
                    })
                })
            }
            res.render("login", {
                err: {
                    status: 1,
                    title: "Yêu Cầu",
                    content: "Đăng Nhập Trước Khi Vào Trang Quản Trị !"
                }, cart: obj,
                length: len,
                saleTotal: saleTotal,
                total: total,
                productInCart: arr
            })
        })
    }
    next();
}

