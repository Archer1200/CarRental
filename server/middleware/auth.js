const jwt = require('jsonwebtoken')
const User = require('../models/user')

const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.json({ success: false, message: "Not authorised" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) 
        if (!decoded.id) {                                          
            return res.json({ success: false, message: "Not  at authorised" })
        }
        req.user = await User.findById(decoded.id).select("-password")  
        next()
    } catch (error) {
        return res.json({ success: false, message: "Not authorised" })
    }
}

module.exports = { protect }
