import express from 'express'
import connectDB from './config/database.js'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import userRoute from './routes/userRoutes.js'
import orderRoute from './routes/orderRoutes.js'

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true}))

dotenv.config({})

app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/users', userRoute)
app.use('/api/v1/orders', orderRoute)

app.listen(process.env.PORT, () => {
    connectDB()
    console.log(`Server is listening on PORT: ${process.env.PORT}`)
})