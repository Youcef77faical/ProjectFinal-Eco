const { generateUrl } = require("../helpers/url")

module.exports = (product) => {
    return {
        id: product._id,
        name: product.name,
        image: generateUrl(product.image.replaceAll('\\', '/')),
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        category: product.category,
        colors: product.colors, 
        sizes: product.sizes, 
    }
}