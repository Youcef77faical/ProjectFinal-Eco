const mongoose = require('mongoose')

module.exports = mongoose.model('Order', {
    name: String,
    phone: String,
    address: String,
    items: [
        {
            product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
            quantity: Number
        }
    ],
    totalPrice: Number,
    date: Date
})