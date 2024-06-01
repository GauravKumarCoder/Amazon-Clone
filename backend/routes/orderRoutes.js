import express from 'express'
import { createOrder, getUserOrders, deleteOrder} from '../controllers/orderController.js'
import checkAuthentication from './../middlewares/checkAuthentication.js'

const router = express.Router()

router.post('/createOrder',checkAuthentication, createOrder)
router.get('/getOrder', checkAuthentication, getUserOrders)
router.get('/deleteOrder/:orderId', checkAuthentication, deleteOrder)

export default router