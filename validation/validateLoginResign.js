const user = require("../models/schemaUser");
const products = require("../models/schemaProduct");
const orders = require("../models/schemaOrder");
const mongoose = require("mongoose");

module.exports.checkLogin = function (req, res, next) {
    var data = req.body;
    if (data.username !== "" && data.password !== "") {

        if (data.username == "admin" && data.password == 1) {
            res.cookie("user", data.username);
            res.redirect("/admin/home");
        } else {
            res.cookie("u", data.username);
            res.cookie("p", data.password);
            res.redirect("/check");
        }
    } else {
        res.render("login", {
            err: {
                status: 1,
                title: "Cảnh Báo !",
                content: "Không Được Để Trống Username Hoặc Password !"
            }
        });
    }
    next();
}

module.exports.doResign = function (req, res) {
    var data = req.body;
    var d = new Date();
    if (data.username !== "" && data.password !== "") {
        const dt = {
            username: data.username,
            password: data.password,
            name: data.name,
            date: d
        }
        const us = new user(dt);
        us.save();
        res.redirect("/login");
    } else {
        res.render("resign", {
            err: {
                status: 1,
                title: "Cảnh Báo",
                content: "Điền Đầy Đủ Thông Tin !"
            }
        })
    }
}

module.exports.Login = function (req, res) {
    if (req.cookies.us) {
        res.redirect("/shop/home");
    }
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
                status: 0
            },
            cart: obj,
            length: len,
            saleTotal: saleTotal,
            total: total,
            productInCart: arr
        })
    })
}

module.exports.Logout = function (req, res) {
    res.cookie("us", null, { maxAge: 0 });
    res.redirect("/shop/home");
}

module.exports.Resign = function (req, res) {
    if (req.cookies.us) {
        res.redirect("/shop/home");
    }
    const user = req.cookies.us;
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
        const path = req.originalUrl;
        res.render("resign", {
            err: {
                status: 0
            },
            cart: obj,
            length: len,
            saleTotal: saleTotal,
            total: total,
            productInCart: arr
        })
    })
}

module.exports.check = function (req, res) {
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
        var data = req.cookies;
        const path = req.originalUrl;
        user.findOne({ "username": data.u }).then(dt => {
            if (!dt) {
                res.render("login", {
                    err: {
                        status: 1,
                        title: "Cảnh Báo !",
                        content: "Tài Khoản Không Tồn Tại !"
                    },
                    cart: obj,
                    length: len,
                    total: total,
                    saleTotal: saleTotal,
                    productInCart: arr
                })
            }
            if (dt.username == data.u && dt.password == data.p) {
                res.cookie("us", dt);
                res.redirect("/shop/home");
            }
            if (dt.username !== data.u && dt.password !== data.p) {
                res.render("login", {
                    err: {
                        status: 1,
                        title: "Cảnh Báo !",
                        content: "Tài Khoản Không Tồn Tại !"
                    },
                    cart: obj,
                    length: len,
                    total: total,
                    saleTotal: saleTotal,
                    productInCart: arr
                })
            }
            if (dt.username !== data.u || dt.password !== data.p) {
                res.render("login", {
                    err: {
                        status: 1,
                        title: "Cảnh Báo !",
                        content: "Tài Khoản Hoặc Mật Khẩu Không Chính Xác !"
                    },
                    cart: obj,
                    length: len,
                    total: total,
                    saleTotal: saleTotal,
                    productInCart: arr
                })
            }
        })
    })
}

module.exports.cart = function (req, res) {
    var data = req.params.id;
    const user = req.cookies.us;
    var arr = req.cookies.products;
    var demCart = 0;
    if (arr) {
        arr.forEach(function (i) {
            if (i.cart == data) {
                i.count = i.count + 1;
                demCart = demCart + 1;
            }
        })
        if (demCart != 0) {
            res.cookie("products", arr);
        }
        if (demCart == 0) {
            carts = {
                cart: data,
                count: 1
            }
            arr.push(carts);
            res.cookie("products", arr);
        }
    } else {
        arr = [];
        carts = {
            cart: data,
            count: 1
        }
        arr.push(carts);
        res.cookie("products", arr);
    }
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
        const path = req.originalUrl;
        const news = data[data.length - 1];
        res.render("cart-ajax", {
            products: data.reverse(),
            path: path,
            user: user,
            cart: obj,
            length: len,
            saleTotal: saleTotal,
            total: total,
            news: news,
            productInCart: arr
        })
    })
}

module.exports.updateCart = function (req, res) {
    var update = req.body.cart.reverse();
    var arr = req.cookies.products;
    var dem = 0;
    arr.forEach(function (i, index) {
        if (i.count == update[index]) {
            dem = dem + 1;
        }
    })

    if (dem < arr.length) {
        arr.forEach(function (i, index) {
            i.count = parseInt(update[index]);
        })
        res.cookie("products", arr)
    }
    res.redirect("/shop/checkout");
}

module.exports.deleteCart = function (req, res) {
    const del = req.params.id;
    var arr = req.cookies.products;
    var gt = arr.indexOf(del);
    arr.splice(gt, 1);
    res.cookie("products", arr);
    res.redirect("/shop/checkout");
}

module.exports.createOrder = function (req, res) {
    const us = req.cookies.us;
    const arr = req.cookies.products;
    const d = new Date();
    var obj = [];
    var dem = 0;
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
        const dataOrder = {
            date: d,
            status: 0,
            products: arr,
            userId: us._id,
            total: total,
            saleTotal: saleTotal
        }
        const order = new orders(dataOrder);
        order.save();
        res.cookie("data", req.body);
        res.redirect("/placeOrder");
    })
}

module.exports.placeOrder = function (req, res) {
    const data = req.cookies.data;
    const us = req.cookies.us;
    if (data.fullname == null && data.address == null && data.email == null && data.phone == null) {
        res.cookie("products", []);
        res.render("success");
    } else {
        user.findOneAndUpdate({ "_id": us._id }, {
            $set: {
                "username": us.username,
                "password": us.password,
                "name": us.name,
                "fullname": data.fullname,
                "address": data.address,
                "phone": data.phone,
                "email": data.email
            }
        }, (err) => {
            if (err) throw err;
        });

        let nguoidung = {
            username: us.username,
            password: us.password,
            name: us.name,
            fullname: data.fullname,
            address: data.address,
            phone: data.phone,
            email: data.email
        }

        res.cookie("us", nguoidung);
        res.cookie("products", []);
        res.render("success");
    }
}

module.exports.information = function (req, res) {
    const user = req.cookies.us;
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
        const path = req.originalUrl;
        const news = data[data.length - 1];
        res.render("information", {
            path: path,
            user: user,
            cart: obj,
            length: len,
            saleTotal: saleTotal,
            total: total,
            news: news,
            productInCart: arr
        })
    })
}

module.exports.update_information = function (req, res) {
    let update = req.body;
    let user_ = req.cookies.us;
    user.findOneAndUpdate({ _id: mongoose.Types.ObjectId(user_._id) }, {
        $set: {
            "username": user_.username,
            "password": user_.password,
            "name": update.name,
            "fullname": update.fullname,
            "address": update.address,
            "email": update.email,
            "phone": update.phone
        }
    }, err => {
        if (err) throw err;
    })

    let nguoidung = {
        _id: user_._id,
        username: user_.username,
        password: user_.password,
        order: user_.order,
        name: update.name,
        fullname: update.fullname,
        address: update.address,
        email: update.email,
        phone: update.phone
    }

    res.cookie("us", nguoidung);
    res.redirect("/information");
}

module.exports.changepassword = function (req, res) {
    const user = req.cookies.us;
    const arr = req.cookies.products;
    console.log(user);
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
        const path = req.originalUrl;
        const news = data[data.length - 1];
        res.render("password", {
            path: path,
            user: user,
            cart: obj,
            length: len,
            saleTotal: saleTotal,
            total: total,
            news: news,
            error: 0,
            productInCart: arr
        })
    })
}

module.exports.doChangepassword = function (req, res) {
    let update = req.body;
    let user_ = req.cookies.us;

    if (update.password == user_.password) {
        let update = req.body;
        let user_ = req.cookies.us;
        user.findOneAndUpdate({ _id: mongoose.Types.ObjectId(user_._id) }, {
            $set: {
                "username": user_.username,
                "password": update.new_password,
                "name": user_.name,
                "fullname": user_.fullname,
                "address": user_.address,
                "email": user_.email,
                "phone": user_.phone
            }
        }, err => {
            if (err) throw err;
        })

        let nguoidung = {
            _id: user_._id,
            username: user_.username,
            password: update.new_password,
            order: user_.order,
            name: user_.name,
            fullname: user_.fullname,
            address: user_.address,
            email: user_.email,
            phone: user_.phone
        }

        res.cookie("us", nguoidung);
        res.redirect("/changepassword");
    } else {
        const user = req.cookies.us;
        const arr = req.cookies.products;
        var obj = [];
        var err = 1;
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
            const path = req.originalUrl;
            const news = data[data.length - 1];
            res.render("password", {
                path: path,
                user: user,
                cart: obj,
                length: len,
                saleTotal: saleTotal,
                total: total,
                news: news,
                error: err,
                productInCart: arr
            })
        })
    }
}

module.exports.orderHistory = function (req, res) {
    const user = req.cookies.us;
    const arr = req.cookies.products;
    var obj = [];
    dem = 0;
    var total = 0;
    var saleTotal = 0;
    var len = 0;
    orders.find({ userId: user._id }).then(order => {
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
            const path = req.originalUrl;
            const news = data[data.length - 1];
            res.render("orderhistory", {
                path: path,
                user: user,
                cart: obj,
                length: len,
                saleTotal: saleTotal,
                total: total,
                news: news,
                order: order.reverse(),
                productInCart: arr
            })
        })
    })
}

module.exports.viewOrderhistory = function (req, res) {
    const user = req.cookies.us;
    const arr = req.cookies.products;
    const id = req.params.id;
    var obj = [];
    var detail_pro = [];
    var mang = [];
    dem_pro = 0;
    dem = 0;
    var total = 0;
    var saleTotal = 0;
    var len = 0;
    orders.find({ _id: mongoose.Types.ObjectId(id) }).then(order => {
        let pro = order[0].products.reverse();
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
            if (pro) {
                data.forEach(function (i) {
                    pro.forEach(function (z) {
                        if (i._id == z.cart) {
                            detail_pro[dem_pro] = i;
                            dem_pro = dem_pro + 1;
                        }
                    })
                })
            }

            detail_pro.forEach(function (i) {
                pro.forEach(function (z) {
                    if (i._id == z.cart) {
                        var data = {
                            cart: i._id,
                            count: z.count
                        }
                        mang.push(data);
                    }
                })
            })
            const path = req.originalUrl;
            const news = data[data.length - 1];
            res.render("viewOrderhistory", {
                path: path,
                user: user,
                cart: obj,
                length: len,
                saleTotal: saleTotal,
                total: total,
                news: news,
                order: mang,
                total_order: order,
                productInCart: arr,
                detail: detail_pro
            })
        })
    })
}

module.exports.deleteOrder = function (req, res) {
    let id = req.params.id;
    orders.findOneAndRemove({ _id: mongoose.Types.ObjectId(id) }, err => {
        if (err) throw err;
        return;
    });
    res.redirect("/orderhistory");
}