
const jwt = require('jsonwebtoken')
const User = require('../models/User')


exports.login = async (req, res, next) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })

    if (!user) {
        return res.status(400).json({ message: 'Wrong email or password' })
    }

    jwt.sign({ userId: user._id }, process.env.JWT_KEY, (err, token) => {
        if (err) {
            next(err)
        }

        res.json({
            token,
            user,
        })
    })
}

exports.account = async (req, res, next) => {
    return res.json(req.user)
}