import bcrypt from "bcrypt"
async function hashPassword(password){
    try{
     const hashedPassword = await bcrypt.hash(password, 10)
     return hashPassword
    }
    catch{
        return null
    }
}

export default hashPassword