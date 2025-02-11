const Product = require("../models/Product")
const productResource = require("../resoures/productResource")
const { createProductShema } = require("../Validations/productValidations")

exports.getProducts = async (req, res, next) => {
    const filters = {}

    if (req.query.category) {
        filters.category = req.query.category
    }

    if (req.query.name) {
        filters.name = { $regex: `.*${req.query.name}.*`, $options: 'i' }
    }

    const sort = {}

    if (req.query.sortBy && req.query.sortDirection) {
        sort[req.query.sortBy] = parseInt(req.query.sortDirection)
    }

    try {
        // With pagination: await Product.find(filters).limit(9).skip(9 * (req.query.page - 1)).sort(sort)
        const products = await Product.find(filters).sort(sort) // With filtesr and sort
        return res.json(products.map(product => productResource(product)))
    }
    catch (e) {
        next(e)
    }
}

exports.createProduct = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(422).json({ message: 'The image is required' })
        }
        console.log(req.file)
        const product = await Product.create({
            name: req.body.name,
            price: req.body.price,
            image: req.file.path,
            description: req.body.description,
            quantity: req.body.quantity,
            category: req.body.category,
            colors: req.body.colors,
            sizes: req.body.sizes
        })

        return res.status(201).json(productResource(product))
    } catch (e) {
        next(e)
    }
}

exports.getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
        return product ? res.json(productResource(product)) : res.status(404).json({ message: 'Product not found' })
    } catch (e) {
        next(e)
    }
}

exports.updateProduct = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(422).json({ message: 'The image is required' })
        }

        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            price: req.body.price,
            image: req.file.path,
            description: req.body.description,
            quantity: req.body.quantity,
            category: req.body.category,
            colors: req.body.colors,
            sizes: req.body.sizes
        }, { new: true })

        return res.json(productResource(updatedProduct))
    } catch (e) {
        next(e)
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        await product.deleteOne()

        return res.json({ message: 'Product deleted successfully' })
    } catch (e) {
        next(e)
    }
}