import dotenv from "dotenv"
import mongoose from "mongoose";
import express from "express"
import { authRouter } from "./apis/routes/auth.mjs";
import { generalKnowledgeRouter } from "./apis/routes/generalKnowledge.mjs";

dotenv.config()


mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on("error", (error)=>{console.log(error)})
db.once("open",()=>{console.log("connected")})

const app = express()

app.use(express.json())

app.use("/auth", authRouter)
app.use("/gk",generalKnowledgeRouter)
app.use('/gk', express.static('uploads'));
app.listen(3000)