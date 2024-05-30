import mongoose from 'mongoose'
import User from '../models/UserModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../models/UserModel.js'


export const createUser = async (req,res) => {
    try {
        const {username, mobileNo, password, email} = req.body;
        if(!mobileNo || !username || !password || !email){
            return res.status(400).json({
                msg: "All fields are required"});
        }

        const user  = await User.findOne({email})
        if (user) {
            console.log(user)
            return res.status(400).json({
                msg: "User already exists",
                success: true});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username,
            password: hashedPassword,
            mobileNo,
            email,
        })
        return res.status(201).json({msg: "Account created successfully", success: true});
    } catch(err) {
        console.log ("Somethig went wrong " + err)
    }
}

export const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                msg: "All fields are required"});
        }
        
        const user  = await User.findOne({email})

        if(!user) {
            return res.status(400).json({
                msg: "Account Not Found!",
                success: false
            })
        };
        
        const checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword){
            return res.status(400).json({
                msg: "Incorrect Password",
                success: false});
        }

        const tokenData = {
            userId: user._id
        };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
            expiresIn: "1d"
        })

        return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpOnly: true, sameSite:'strict'}).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            cart: user.cart,
        })

    }
    catch(err) {
        console.log ("Somethig went wrong " + err)
    }
}

export const addtoUserCart = async (req,res) => {

    try {
        const user = await User.findOne({_id: req.body.userId})
    
        var cartItem = user.cart
    
        cartItem.push(req.body.item)
        
        user.cart = cartItem
        
        await user.save()
    
        res.status(200).json({
            msg: "Item added to cart",
            success: true
        })

    } catch(err ){
        console.log("Something went wrong: ",err)
    }

   
}

export const removefromCart = async (req,res) => {
    try {
        const productId = req.body.productId
        const user = await User.findOne({_id: req.body.userId})
    
        var cartItem = user.cart
        cartItem = cartItem.filter((item) => item.id !== productId)
        
        
        user.cart = cartItem
        user.save()
        
        res.status(200).json({
            msg: "Item Removed from cart",
            success: true
        })
    } catch (err) {
        console.log("Something went wrong: ",err)
    }
}