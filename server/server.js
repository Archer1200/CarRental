require('dotenv/config')
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db.js')
const userRouter = require('./routes/userRoutes.js')
const ownerRouter  = require('./routes/ownerRoutes.js')
const bookingRouter = require('./routes/bookingRoutes.js')

const app = express()

app.use(cors({ origin: "*" }))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization")
  next()
})
app.options('*', cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Server is running')
})
app.use('/api/user', userRouter)
app.use('/api/owner',ownerRouter)
app.use('/api/bookings',bookingRouter)





connectDB()
module.exports = app


