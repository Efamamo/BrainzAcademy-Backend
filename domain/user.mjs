import mongoose from "mongoose";
import hashPassword from "../infrastructure/password_service.mjs";

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


const User = mongoose.model("User",UserSchema)
export default User