const shortId = require('shortid');

module.exports = function (req, res, next) {
    if(!req.cookies.session){
        res.cookie("session", shortId.generate());
    }

    next();
}