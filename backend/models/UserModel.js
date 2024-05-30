import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    mobileNo: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    cart: {
        type: Array,
        default: []
    }
})

const userModel = mongoose.model("user", userSchema)

export default userModel