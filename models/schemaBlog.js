const mongoose = require('mongoose');
const schema = mongoose.Schema;

const blog = new schema({
    date: Date,
    title: String,
    image: String,
    content1: String,
    content2: String
})

const Blog = mongoose.model('Blog', blog, 'blogs');
module.exports = Blog;