import express from 'express'
import { createUser, loginUser, addtoUserCart, removefromCart, emptyCart } from './../controllers/userController.js'

const router = express.Router()

router.post('/register', createUser)
router.post('/login', loginUser)
router.post('/addtocart', addtoUserCart) //add to cart
router.post('/removefromcart', removefromCart)
router.post('/emptyCart', emptyCart)

export default router