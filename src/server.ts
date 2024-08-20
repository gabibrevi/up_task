import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db'
import projectRoutes from './routes/projectRoutes'

dotenv.config()

connectDB()

const app = express()

//TO READ JSON ON BODY HTTP REQUEST
app.use(express.json())

//ADDING ROUTE
app.use('/api/projects', projectRoutes)

export default app
