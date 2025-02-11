const express = require('express')
const authController = require('../controllers/authController')
const validationMiddleware = require('../middlewares/validationMiddleware')
const { loginSchema } = require('../Validations/authValidation')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()
router.post('/login', validationMiddleware(loginSchema), authController.login)
router.get('/account', authMiddleware, authController.account)

module.exports = router;