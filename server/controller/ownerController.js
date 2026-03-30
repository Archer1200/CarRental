const Car = require('../models/cars')
const fs = require('fs')
const Booking = require('../models/Booking')  
const ImageKit = require('imagekit')
const User = require('../models/User')

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})

const changeRoleToOwner = async (req, res) => {
    try {
        const { _id } = req.user
        await User.findByIdAndUpdate(_id, { role: "owner" })
        res.json({ success: true, message: "Now you can list cars" })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

const addCar = async (req, res) => {
    try {
        const { _id } = req.user
        const car = JSON.parse(req.body.cardata)
        const imageFile = req.file
        const fileBuffer = fs.readFileSync(imageFile.path)

        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/cars'
        })

        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { width: '1280' },
                { quality: 'auto' },
                { format: 'webp' }
            ]
        })

        await Car.create({ ...car, owner: _id, image: optimizedImageUrl })
        res.json({ success: true, message: "Car added successfully" })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

const getOwnerCars = async (req, res) => {
    try {
        const { _id } = req.user
        const cars = await Car.find({ owner: _id })
        res.json({ success: true, cars })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

const toggleCarAvailability = async (req, res) => {
    try {
        const { _id } = req.user
        const { carId } = req.body
        const car = await Car.findById(carId) 
      
        if (car.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: "Unauthorized" })
        }
        car.isAvailable = !car.isAvailable
        await car.save()
        res.json({ success: true, message: "Availability Toggled" })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

const deleteCar = async (req, res) => {  // Bug 4 Fixed: missing req, res
    try {
        const { _id } = req.user
        const { carId } = req.body
        const car = await Car.findById(carId)  // Bug 5 Fixed: findById({carId}) → findById(carId)

        // Bug 6 Fixed: removed extra !
        if (car.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: "Unauthorized" })
        }
        car.owner = null
        car.isAvailable = false  // Bug 7 Fixed: isAvaliable typo
        await car.save()
        res.json({ success: true, message: "Car Removed" })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

const getDashboardData = async (req, res) => {
    try {
        const { _id, role } = req.user
        if (role !== 'owner') {
            return res.json({ success: false, message: "Unauthorized" })
        }

        const cars = await Car.find({ owner: _id })
        const bookings = await Booking.find({ owner: _id }).populate('car').sort({ createdAt: -1 })

        const pendingBookings = await Booking.find({ owner: _id, status: "pending" })
        const completedBookings = await Booking.find({ owner: _id, status: "confirmed" })

        const monthlyRevenue = bookings
            .filter(booking => booking.status === 'confirmed')
            .reduce((acc, booking) => acc + booking.price, 0)

        const dashboardData = {
            totalCars: cars.length,
            totalBookings: bookings.length,
            pendingBookings: pendingBookings.length,
            completedBookings: completedBookings.length,
            recentBookings: bookings.slice(0, 3),
            monthlyRevenue
        }
        res.json({ success: true, dashboardData })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// Bug 10 Fixed: misplaced braces, optimizedImageUrl outside try block
const updateUserImage = async (req, res) => {
    try {
        const { _id } = req.user
        const imageFile = req.file
        const fileBuffer = fs.readFileSync(imageFile.path)

        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/users'
        })

        // Bug 11 Fixed: response. filePath space, let → const
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { width: '400' },
                { quality: 'auto' },
                { format: 'webp' }
            ]
        })

        await User.findByIdAndUpdate(_id, { image: optimizedImageUrl })
        res.json({ success: true, message: "Image Updated" })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

module.exports = { changeRoleToOwner, addCar, getOwnerCars, toggleCarAvailability, deleteCar, getDashboardData, updateUserImage }