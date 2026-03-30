const User = require("../models/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Car = require('../models/cars')
// Bug Fixed: payload as object + expiresIn added
const generatetoken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

const registrationUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password || password.length < 8) {
            return res.json({ success: false, message: 'Fill all the fields' })
        }

        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.json({ success: false, message: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hashedPassword })
        const token = generatetoken(user._id.toString())
        res.json({ success: true, token })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Credentials" })
        }

        const token = generatetoken(user._id.toString())
        res.json({ success: true, token })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

const getUserData = async (req, res) => {
    try {
        // Bug Fixed: get user from req.user (set by protect middleware), not req.body
        res.json({ success: true, user: req.user })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

const getcars = async (req, res) => {
    try {
        const cars = await Car.find({isAvailable: true})
        res.json({ success: true, cars })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}
module.exports = { loginUser, registrationUser, getUserData , getcars}
