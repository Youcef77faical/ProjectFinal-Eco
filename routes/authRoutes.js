const express = require('express')
const authController = require('../controleers/authController')
const validationMiddleware = require('../middlewares/authMiddleware')
const {loginSchema} = require('../Validations/authValidation')
const authMiddleware = require('../middlewares/authMiddleware')


const router = express.Router()

router.post('/login',validationMiddleware(loginSchema), authController.login)
router.get('/account' , authMiddleware ,authController.account)

module.exports = router;