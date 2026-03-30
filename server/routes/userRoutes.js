const express = require('express')
const router = express.Router()
const { registrationUser, loginUser,getUserData,getcars } = require('../controller/userController.js')
const {protect} = require('../middleware/auth.js')

router.post('/register', registrationUser)
router.post('/login', loginUser)
router.get('/data', protect, getUserData)
router.get('/cars', getcars)

module.exports = router