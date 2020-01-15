const categorys = require("../models/schemaCategory");
const products = require("../models/schemaProduct");
const orders = require("../models/schemaOrder");
const blogs = require("../models/schemaBlog");
const users = require("../models/schemaUser");
const mongoose = require('mongoose');


module.exports.outLogin = function (req, res) {
    res.cookie("user", "abc");
    res.redirect("/login");
}

// User

module.exports.contact = function (req, res) {
    users.find({}).then(data => {
        orders.find({}).then(order => {
            res.render("adminContact", {
                users: data.reverse(),
                orders: order
            });
        })
    })
}

module.exports.viewUser = function (req, res) {
    const id = req.params.id;
    users.find({ _id: mongoose.Types.ObjectId(id) }).then(user => {
        orders.find({ userId: id }).then(order => {
            res.render("viewUser", {
                orders: order.reverse(),
                user: user,
                length: order.length
            })
        })
    })
}

module.exports.updateUser = function (req, res) {
    let update = req.body;
    users.findOneAndUpdate({ _id: mongoose.Types.ObjectId(update._id) }, {
        $set: {
            "username": update.username,
            "password": update.password,
            "name": update.name,
            "fullname": update.fullname,
            "address": update.address,
            "email": update.email,
            "phone": update.phone
        }
    }, err => {
        if (err) throw err;
    })

    res.redirect("/admin/contact");
}

module.exports.deleteUser = function (req, res) {
    var _id = req.params.id;
    orders.find({ userId: _id }).then(order => {
        if (order.length == 0) {
            users.findOneAndRemove({ "_id": mongoose.Types.ObjectId(_id) }, (err) => {
                if (err) {
                    throw err;
                    return;
                }
            });
            res.redirect("/admin/category");
        } else {
            res.redirect("/admin/category");
        }
    })
}


// Category

module.exports.category = function (req, res) {
    categorys.find({}).then(function (data) {
        const itemPage = 6;
        const page = parseInt(req.query.page) || 1;
        const itemBegin = (page - 1) * itemPage;
        const itemEnd = page * itemPage;
        const count = data.length;
        if (count % itemPage !== 0) {
            var giatri = parseInt(count / itemPage) + 1;
        } else {
            var giatri = count / itemPage;
        }
        const maxPage = giatri;
        res.render("adminCategory", {
            categorys: data.reverse().slice(itemBegin, itemEnd),
            page: page,
            maxPage: maxPage
        });
    })
        .catch(() => {
            console.log("err !");
        })
}

module.exports.addCategory = function (req, res) {
    res.render("categoryAdd");
}

module.exports.doAddCategory = function (req, res) {
    var data = req.body;
    if (!data.dateCategory) {
        const d = new Date();
        data.dateCategory = d;
    }
    var dt = {
        name: data.nameCategory,
        key: data.keyCategory,
        date: data.dateCategory,
        description: data.descriptionCategory
    }
    var pro = new categorys(dt);
    pro.save();
    res.redirect("/admin/category");
}

module.exports.updateCategory = function (req, res) {
    const id = req.params.id;
    categorys.find({ "_id": mongoose.Types.ObjectId(id) }).then(function (data) {
        res.render("categoryUpdate", {
            category: data,
            id: id
        });
    })
}

module.exports.doUpdateCategory = function (req, res) {
    var dt = req.body;
    if (!dt.dateCategory) {
        const d = new Date();
        dt.dateCategory = d;
    }

    categorys.findOneAndUpdate({ _id: mongoose.Types.ObjectId(dt.id) }, {
        $set: {
            "name": dt.nameCategory,
            "key": dt.keyCategory,
            "date": dt.dateCategory,
            "description": dt.descriptionCategory
        }
    }, (err) => {
        if (err) throw err;
    });
    res.redirect("/admin/category");
}

module.exports.deleteCategory = function (req, res) {
    var _id = req.params.id;
    products.find({ "categoryId": _id }).then(products => {
        if (products.length == 0) {
            categorys.findOneAndRemove({ "_id": mongoose.Types.ObjectId(_id) }, (err) => {
                if (err) {
                    throw err;
                    return;
                }
            });
            res.redirect("/admin/category");
        } else {
            res.redirect("/admin/category");
        }
    })
}

// Product

module.exports.product = function (req, res) {
    const query = req.query.categoryId;
    categorys.find({}).then(function (dt) {
        if (query == "all" || (!query)) {
            products.find({}).then(function (data) {
                const itemPage = 15;
                const page = parseInt(req.query.page) || 1;
                const itemBegin = (page - 1) * itemPage;
                const itemEnd = page * itemPage;
                const count = data.length;
                if (count % itemPage !== 0) {
                    var giatri = parseInt(count / itemPage) + 1;
                } else {
                    var giatri = count / itemPage;
                }
                const maxPage = giatri;
                res.render("adminProduct", {
                    products: data.reverse().slice(itemBegin, itemEnd),
                    page: page,
                    maxPage: maxPage,
                    dataCategory: dt,
                    categoryId: query
                });
            })
                .catch(() => {
                    console.log("err !");
                })
        } else if (query) {
            products.find({ "categoryId": query }).then(function (data) {
                const itemPage = 15;
                const page = parseInt(req.query.page) || 1;
                const itemBegin = (page - 1) * itemPage;
                const itemEnd = page * itemPage;
                const count = data.length;
                if (count % itemPage !== 0) {
                    var giatri = parseInt(count / itemPage) + 1;
                } else {
                    var giatri = count / itemPage;
                }
                const maxPage = giatri;
                res.render("adminProduct", {
                    products: data.reverse().slice(itemBegin, itemEnd),
                    page: page,
                    maxPage: maxPage,
                    dataCategory: dt,
                    categoryId: query
                });
            })
                .catch(() => {
                    console.log("err !");
                })
        }
    })
}

module.exports.addProduct = function (req, res) {
    categorys.find({}).then(function (data) {
        res.render("productAdd", {
            dataCategory: data
        });
    })
}

module.exports.doAddProduct = function (req, res) {
    var dt = req.body;
    var file = req.files;

    var url_image = [];
    if (file) {
        for (var i = 0; i < file.length; i++) {
            url_image[i] = file[i].path.split("\\").join('/');
        }
    } else {
        url_image = [];
    }

    var saleProduct = 0;
    if (!dt.saleProduct || dt.saleProduct == 0) {
        saleProduct = 0;
        var saleCost = dt.costProduct - saleProduct * dt.costProduct;
        saleCost = Math.round(saleCost);
    } else {
        saleProduct = dt.saleProduct;
        var saleCost = dt.costProduct - saleProduct / 100 * dt.costProduct;
        saleCost = Math.round(saleCost);
    }

    const d = new Date();
    const data = {
        name: dt.nameProduct,
        cost: dt.costProduct,
        key: dt.keyProduct,
        count: dt.countProduct,
        sale: saleProduct,
        saleCost: saleCost,
        date: d,
        description: dt.descriptionProduct,
        categoryId: dt.categoryId,
        images: url_image
    }

    const pro = new products(data);
    pro.save();

    res.redirect("/admin/product");
}

module.exports.updateProduct = function (req, res) {
    const id = req.params.id;
    categorys.find({}).then(function (data) {
        products.find({ _id: mongoose.Types.ObjectId(id) }).then((dt) => {
            res.render("productUpdate", {
                dataCategory: data,
                product: dt,
                id: id
            });
        });
    })
}

module.exports.doUpdateProduct = function (req, res) {
    var dt = req.body;
    var file = req.files;
    var url_image = [];
    if (file) {
        for (var i = 0; i < file.length; i++) {
            url_image[i] = file[i].path;
        }
    } else {
        url_image = [];
    }

    var saleProduct = 0;
    if (!dt.saleProduct || dt.saleProduct == 0) {
        saleProduct = 0;
        var saleCost = dt.costProduct - saleProduct * dt.costProduct;
        saleCost = Math.round(saleCost);
    } else {
        saleProduct = dt.saleProduct;
        var saleCost = dt.costProduct - saleProduct / 100 * dt.costProduct;
        saleCost = Math.round(saleCost);
    }

    const d = new Date();
    products.findOneAndUpdate({ _id: mongoose.Types.ObjectId(dt.id) }, {
        $set: {
            "name": dt.nameProduct,
            "cost": dt.costProduct,
            "key": dt.keyProduct,
            "count": dt.countProduct,
            "sale": saleProduct,
            "saleCost": saleCost,
            "date": d,
            "description": dt.descriptionProduct,
            "categoryId": dt.categoryId,
            "images": url_image
        }
    }, (err) => {
        if (err) throw err;
    });
    res.redirect("/admin/product");
}

module.exports.deleteProduct = function (req, res) {
    var _id = req.params.id;
    products.findOneAndRemove({ "_id": mongoose.Types.ObjectId(_id) }, (err) => {
        if (err) {
            throw err;
            return;
        }
    });
    res.redirect("/admin/product");
}

// Blog

module.exports.blog = function (req, res) {
    blogs.find({}).then(data => {
        res.render("adminBlog", {
            blogs: data.reverse()
        });
    })
}

module.exports.doAddBlog = function (req, res) {
    const dt = req.body;
    var file = req.files;
    var url_image = [];

    if (file) {
        for (var i = 0; i < file.length; i++) {
            url_image[i] = file[i].path.split('\\').join('/');
        }
    } else {
        url_image = [];
    }

    const d = new Date();
    const data = {
        date: d,
        title: dt.title,
        image: url_image[0],
        content1: dt.content_01,
        content2: dt.content_02
    }

    const blo = new blogs(data);
    blo.save();

    res.redirect("/admin/blog");
}

// Order

module.exports.home = function (req, res) {
    orders.find({}).then(function (data) {
        const itemPage = 10;
        const page = parseInt(req.query.page) || 1;
        const itemBegin = (page - 1) * itemPage;
        const itemEnd = page * itemPage;
        const count = data.length;
        if (count % itemPage !== 0) {
            var giatri = parseInt(count / itemPage) + 1;
        } else {
            var giatri = count / itemPage;
        }
        const maxPage = giatri;
        res.render("adminHome", {
            orders: data.reverse().slice(itemBegin, itemEnd),
            page: page,
            maxPage: maxPage,
        });
    })
}

module.exports.accept_Order = function (req, res) {
    let id = req.params.id;
    orders.find({ _id: mongoose.Types.ObjectId(id) }).then(data => {
        orders.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, {
            $set: {
                "products": data[0].products,
                "date": data[0].date,
                "status": 1,
                "userId": data[0].userId,
                "total": data[0].total,
                "saleTotal": data[0].saleTotal
            }
        }, (err) => {
            if (err) throw err;
        })
        res.redirect("/admin/home");
    })
}

module.exports.delete_Order = function (req, res) {
    let id = req.params.id;
    orders.findOneAndRemove({ _id: mongoose.Types.ObjectId(id) }, err => {
        if (err) throw err;
        return;
    });
    res.redirect("/admin/home");
}

module.exports.viewOrder = function (req, res) {
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