const mongoose = require('mongoose')


module.exports = mongoose.model('Product', {
    name: String,
    price: Number,
    image: String,
    description: String,
    quantity: Number,
    category: String,
    colors: [String],
    sizes: [String]
})