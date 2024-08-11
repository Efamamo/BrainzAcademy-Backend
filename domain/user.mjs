import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true
    }
})


const User = mongoose.model("User",UserSchema)
export default User