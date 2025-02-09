const jwt = require('jsonwebtoken')
const User =require('../models/User')

module.exports = async (req , res , next)=>{
    try{
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1]
        jwt.verify(token ,process.env.JWT_KEY , async(err, data)=>{
            if(err){
                return res.status(403).json({message: 'Unauthenticated'})
            }
            req.user =await User.findById(data.userId)
            next()
        })
    }catch (e) {
        res.status(403).json({message: 'Unauthenticated'})
    }
}