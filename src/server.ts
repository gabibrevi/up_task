<<<<<<< Updated upstream
import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db'
=======
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { corsConfig } from "./config/cors";
import { connectDB } from "./config/db";
import projectRoutes from "./routes/projectRoutes";
>>>>>>> Stashed changes

dotenv.config();

connectDB();

const app = express();
app.use(cors(corsConfig));

<<<<<<< Updated upstream
export default app
=======
//To read json on body http requests
app.use(express.json());

//Routes
app.use("/api/projects", projectRoutes);

export default app;
>>>>>>> Stashed changes
