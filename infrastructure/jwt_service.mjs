import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const jwtSecret = process.env.JWT_SECRET
export function generateToken(username){
   return  jwt.sign({name:username},jwtSecret)
}