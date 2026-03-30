const express = require('express')
const { protect } = require('../middleware/auth')
const { changeRoleToOwner, addCar, updateUserImage, getOwnerCars, toggleCarAvailability, deleteCar, getDashboardData } = require('../controller/ownerController')  // ✅ combined
const upload = require('../middleware/multer')  // ✅ use your multer middleware file instead

const ownerRouter = express.Router()

ownerRouter.post("/change-role", protect, changeRoleToOwner)
ownerRouter.post("/add-car", upload.single('image'), protect, addCar)
ownerRouter.get("/cars", protect, getOwnerCars)          // ✅ fixed: /car → /cars
ownerRouter.post("/toggle-car", protect, toggleCarAvailability)  // ✅ fixed: toogle → toggle
ownerRouter.post("/delete-car", protect, deleteCar)
ownerRouter.get("/dashboard", protect, getDashboardData)
ownerRouter.post("/update-image", upload.single("image"), protect, updateUserImage)

module.exports = ownerRouter