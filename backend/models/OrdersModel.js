import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderedBy: {
        type: ObjectId,
    },
    products: {
        type: Object,
    }
})

const orderModel = mongoose.model("orders", orderSchema)

export default orderModel