import mongoose from "mongoose";
import express from 'express'
import { signup } from "./apis/controllers/auth_controller.mjs";
mongoose.connect("mongodb://localhost:27017/brainz-academy").then(()=>{console.log("Connected")}).catch((e)=> {console.log(e)})
export const app = express()
app.use(express.json())
app.post("/signup", signup)
app.listen(3000)