import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from './routes/authRoutes.js';
import capsuleRoutes from "./routes/capsuleRoutes.js";
import "./cronJobs.js";






connectDB();


const app=express();

const PORT= process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes); 

app.use("/api/capsules", capsuleRoutes);

app.get('/',(req,res)=>{
    res.send("API is running...")
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));