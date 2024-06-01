import mongoose from 'mongoose'
import Order from '../models/OrdersModel.js'
import User from '../models/UserModel.js'


export const createOrder = async (req, res) => {
    const orderedBy = req.userId
    const {productId, productName, productImage,  productPrice, productRating} = req.body

    try {

        const user = await User.findById(orderedBy)
        if(!user) return res.status(400).json({message: "User not found"}) 



        const order = await Order.create({
            orderedBy,
            productId,
            productName, 
            productImage,
            productPrice,
            productRating
        })

        if (order) {
            res.status(201).json({
                success: true,
                msg: "Order Placed succesfully",
            })
        }

    } 
    catch (err) {
        console.log(err)
    }
}

export const getUserOrders = async (req, res) => {
    const userId = req.userId

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

export const deleteOrder = async (req, res) => {
    console.log("This is wokrig")
    const orderId = req.params.orderId

    try {
        const order = await Order.findById(orderId)
        if(!order) return res.status(400).json({message: "Order not found"}) 

        
        const deleteOrder = await Order.findByIdAndDelete(orderId)
        
        if(deleteOrder) {
            return res.status(200).json({
                success: true,
                msg: "Your Order is cancelled"
            })
        } else {
            return res.status(400).json({
                success: false,
                msg: "Some Error! Try again later"
            })
        }
    } 
    catch (err)  {
      console.log(err)}
}