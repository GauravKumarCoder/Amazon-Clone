import express from 'express'
import { createUser, loginUser, addtoUserCart, removefromCart } from './../controllers/userController.js'

const router = express.Router()

router.post('/register', createUser)
router.post('/login', loginUser)
router.post('/addtocart', addtoUserCart) //add to cart
router.post('/removefromcart', removefromCart)

export default router