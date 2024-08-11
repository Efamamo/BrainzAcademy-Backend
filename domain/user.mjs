import mongoose from "mongoose";
import hashPassword, { comparePassword } from "../infrastructure/password_service.mjs";

const UserSchema = mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: [true, "username is required"],
        unique: true,
        lowercase: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: [true, "password is required"],
        minlength: [8, "minimum password length is 8"]
    }
})


UserSchema.pre("save", async function(next){
    this.password = await hashPassword(this.password)
    next()
})

UserSchema.statics.login = async function (username, password){
   
    const user = await this.findOne({username})
   

    if (user){
        const auth = await comparePassword(password, user.password)
        
        if (auth){
            return [user, null]
        }
            return [null, {"password": "Incorrect Password"}]
    }
    return [null, {"username":"User Not Found"}]

}


const User = mongoose.model("User",UserSchema)
export default User