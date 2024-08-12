import jwt from 'jsonwebtoken'
const jwtSecret = "qwefecdxcfvgbjhnkm,vfc"
export function generateToken(username){
   return  jwt.sign({name:username},jwtSecret)
}