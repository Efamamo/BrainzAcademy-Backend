import express from 'express'
import { login, signup } from '../controllers/auth_controller.mjs'
export const authRouter = express.Router()
    
authRouter.post("/signup", signup)
authRouter.post("/login", login)


