import mongoose from 'mongoose'
import colors from 'colors'
import { exit } from 'process'

export const connectDB = async () => {
    try {
        const conection = await mongoose.connect(process.env.DATABASE_URL)
        console.log(colors.bgCyan.bold('MongoDB connected'))
    } catch (error) {
        console.log(colors.bgRed.bold('MongoDB conection error'))
        exit(1)
    }
}
