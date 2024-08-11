import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true
    }
})


const User = mongoose.model(UserSchema)
export default User