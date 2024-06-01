import express from 'express'
import { createUser, loginUser, addtoUserCart, removefromCart, emptyCart, logoutUser } from './../controllers/userController.js'
import checkAuthentication from '../middlewares/checkAuthentication.js'

const router = express.Router()

router.post('/register', createUser)
router.post('/login', loginUser)
router.post('/addtocart', checkAuthentication, addtoUserCart) //add to cart
router.post('/removefromcart', checkAuthentication, removefromCart)
router.get('/emptyCart',checkAuthentication, emptyCart)
router.get('/logout', checkAuthentication, logoutUser)

export default router