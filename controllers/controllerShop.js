const mongoose = require("mongoose");
const products = require("../models/schemaProduct");
const users = require("../models/schemaUser");
const blogs = require("../models/schemaBlog");

module.exports.Home = function(req, res) {
    const user = req.cookies.us;
    const arr = req.cookies.products;
    var obj = [];
    dem = 0;
    var total = 0;
    var saleTotal = 0;
    var len = 0;
    products.find({}).then(data => {
        if (arr) {
            data.forEach(function(i) {
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
        res.render("index", {
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

module.exports.Contact = function(req, res) {
    const user = req.cookies.us;
    const arr = req.cookies.products;
    var obj = [];
    dem = 0;
    var total = 0;
    var saleTotal = 0;
    var len = 0;
    products.find({}).then(data => {
        if (arr) {
            data.forEach(function(i) {
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
        res.render("contact", {
            user: user,
            cart: obj,
            length: len,
            saleTotal: saleTotal,
            total: total,
            productInCart: arr
        })
    })
}

module.exports.Checkout = function(req, res) {
    const user = req.cookies.us;
    const arr = req.cookies.products;
    var obj = [];
    dem = 0;
    var total = 0;
    var saleTotal = 0;
    var len = 0;
    products.find({}).then(data => {
        if (arr) {
            data.forEach(function(i) {
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
        if (user.address == null && user.fullname == null && user.phone == null && user.email == null) {
            var status = 1;
        } else {
            var status = 0;
        }
        res.render("checkout", {
            user: user,
            cart: obj,
            length: len,
            saleTotal: saleTotal,
            total: total,
            status: status,
            productInCart: arr
        })
    })
}

module.exports.Regular = function(req, res) {
    const user = req.cookies.us;
    const arr = req.cookies.products;
    var obj = [];
    dem = 0;
    var total = 0;
    var saleTotal = 0;
    var len = 0;
    products.find({}).then(data => {
        if (arr) {
            data.forEach(function(i) {
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
        res.render("regular-page", {
            user: user,
            cart: obj,
            length: len,
            saleTotal: saleTotal,
            total: total,
            productInCart: arr
        })
    })
}

module.exports.Shop = function(req, res) {
    const user = req.cookies.us;
    const arr = req.cookies.products;
    var obj = [];
    dem = 0;
    var total = 0;
    var saleTotal = 0;
    var len = 0;
    products.find({}).then(data => {
        if (arr) {
            data.forEach(function(i) {
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
        res.render("shop", {
            products: data.reverse(),
            path: path,
            user: user,
            cart: obj,
            length: len,
            saleTotal: saleTotal,
            total: total,
            soluong: data.length,
            productInCart: arr
        })
    })
}

module.exports.Single_blog = function(req, res) {
    const user = req.cookies.us;
    const arr = req.cookies.products;
    const _id = mongoose.Types.ObjectId(req.params.id);
    var obj = [];
    dem = 0;
    var total = 0;
    var saleTotal = 0;
    len = 0;
    blogs.find({}).then(listblog => {
        blogs.find({ _id: _id }).then(bloger => {
            products.find({}).then(data => {
                if (arr) {
                    data.forEach(function(i) {
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
                var mang = bloger[0].content1;
                res.render("one-blog", {
                    user: user,
                    cart: obj,
                    length: len,
                    saleTotal: saleTotal,
                    noidung: mang,
                    total: total,
                    blogs: bloger,
                    listblog: listblog.reverse(),
                    productInCart: arr
                })
            })
        })
    })
}

module.exports.Single_product = function(req, res) {
    const user = req.cookies.us;
    const data = req.params.id;
    const path = req.originalUrl;
    const arr = req.cookies.products;
    var obj = [];
    dem = 0;
    var total = 0;
    var saleTotal = 0;
    var len = 0;
    products.find({}).then(dat => {
        if (arr) {
            dat.forEach(function(i) {
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
        products.find({ "_id": mongoose.Types.ObjectId(data) }).then(d => {
            var detail_des = d[0].description;
            var listDetail = detail_des.split("\r\n");
            res.render("single-product-details", {
                data: d,
                path: path,
                user: user,
                cart: obj,
                length: len,
                saleTotal: saleTotal,
                total: total,
                description: listDetail,
                productInCart: arr
            });
        })
    })
}

module.exports.Blog = function(req, res) {
    const user = req.cookies.us;
    const arr = req.cookies.products;
    var obj = [];
    dem = 0;
    var total = 0;
    var saleTotal = 0;
    var len = 0;
    blogs.find({}).then(bloger => {
        products.find({}).then(data => {
            if (arr) {
                data.forEach(function(i) {
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
            res.render("blog", {
                user: user,
                cart: obj,
                length: len,
                saleTotal: saleTotal,
                total: total,
                blogs: bloger.reverse(),
                productInCart: arr
            })
        })
    })

}

module.exports.Search = function(req, res) {
    const user = req.cookies.us;
    const arr = req.cookies.products;
    const search = req.query.search;
    var obj = [];
    dem = 0;
    var total = 0;
    var saleTotal = 0;
    var len = 0;
    products.find({}).then(data => {
        if (arr) {
            data.forEach(function(i) {
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
        var arraySearch = [];
        var sl = 0;
        data.filter(function(dta) {
            var check = (dta.name.toLowerCase().indexOf(search.toLowerCase()) !== -1);
            if (check == true) {
                arraySearch.push(dta);
                sl = sl + 1;
            }
        })
        res.render("shop", {
            products: arraySearch,
            path: path,
            user: user,
            cart: obj,
            length: len,
            saleTotal: saleTotal,
            total: total,
            soluong: sl,
            productInCart: arr
        })
    })
}