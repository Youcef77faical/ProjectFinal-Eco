const Order = require("../models/Order")
const Product = require('../models/Product')
exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find()
        return res.json(orders)
    } catch (e) {
        next(e)
    }
}
exports.createOrder = async (req, res, next) => {
    try {
        let totalPrice = 0
        for (const item of req.body.items) {
            const product = await Product.findById(item.product)
            totalPrice += product.price * item.quantity
        }
        const order = await Order.create({
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
            items: req.body.items,
            totalPrice: totalPrice,
            date: new Date(),
        })
        return res.status(201).json(order)
    } catch (e) {
        next(e)
    }
}
exports.getOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate('items.product')
        return res.json(order)
    } catch (e) {
        next(e)
    }
}