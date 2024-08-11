import bcrypt from "bcrypt"
async function hashPassword(password){
    try{
     const hashedPassword = await bcrypt.hash(password, 10)
     return hashedPassword
    }
    catch{
        return null
    }
}

export default hashPassword