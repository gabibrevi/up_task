import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db'
import projectRoutes from './routes/projectRoutes'

dotenv.config()

connectDB()

const app = express()

//ADDING ROUTES
app.use('/api/projects', projectRoutes)

export default app
