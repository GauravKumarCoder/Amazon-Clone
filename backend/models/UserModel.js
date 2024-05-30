import mongoose from "mongoose";

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
        length: 8
    },
    email: {
        type: String,
        required: true,
    },
    cart: {
        type: Array,
        default: []
    },
    orders: {
        type: Array,
        default: []
    },
    address: {
        type: Array,
        default: []
    }
})

const userModel = mongoose.model("user", userSchema)

export default userModel