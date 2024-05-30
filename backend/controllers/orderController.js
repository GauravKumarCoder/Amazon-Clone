import mongoose from 'mongoose'
import Order from '../models/OrdersModel.js'
import User from '../models/UserModel.js'

export const createOrder = async (req, res) => {
    const {orderedBy, products} = req.body

    try {

        const user = await User.findById(orderedBy)
        if(!user) return res.status(400).json({message: "User not found"}) 



        const order = await Order.create({
            orderedBy,
            products
        })

        res.status(200).json({
            success: true,
            msg: "Order Placed Successfully",
        })
    } 
    catch (err) {
        console.log(err)
    }
}

export const getUserOrders = async (req, res) => {
    const {userId} = req.params

    try {
        const orders = await Order.find({orderedBy: userId})
        
        if (orders) {
            return res.status(200).json({
                success: true,
                orders
            })
        }
        
        return res.status(400).json({
            success: false,
            msg: "No Orders Found"
        })
    } catch (err) {
        console.log(err)
    }
}