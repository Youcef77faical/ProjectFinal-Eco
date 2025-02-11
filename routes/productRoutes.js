const express = require('express')
const multer = require('multer')
const productController = require('../controllers/productController')
const validationMiddleware = require('../middlewares/validationMiddleware')
const validObjectIdMiddleware = require('../middlewares/validObjectIdMiddleware')
const { createProductShema, updateProductSchema } = require('../Validations/productValidations')

const router = express.Router()

const upload = multer({ dest: './public/uploads' })

router.get('/products', productController.getProducts)
router.post('/products', upload.single('image'), validationMiddleware(createProductShema), productController.createProduct)
router.get('/products/:id', validObjectIdMiddleware, productController.getProduct)
router.put('/products/:id', upload.single('image'), validObjectIdMiddleware, validationMiddleware(updateProductSchema), productController.updateProduct)
router.delete('/products/:id', validObjectIdMiddleware, productController.deleteProduct)




module.exports = router;