require('dotenv/config')
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db.js')
const userRouter = require('./routes/userRoutes.js')
const ownerRouter  = require('./routes/ownerRoutes.js')
const bookingRouter = require('./routes/bookingRoutes.js')

const app = express()

app.use(cors({
  origin: [
    "https://car-rental-cdyl-ictrlsksb-archer1200s-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Server is running')
})

app.use('/api/user', userRouter)
app.use('/api/owner',ownerRouter)
app.use('/api/bookings',bookingRouter)




connectDB()
module.exports = app


