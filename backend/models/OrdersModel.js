import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productId: {
        type:String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productRating: {
        type: Object,
        required: true
    }

}, {
    timestamps: true
})

const orderModel = mongoose.model("orders", orderSchema)

export default orderModel