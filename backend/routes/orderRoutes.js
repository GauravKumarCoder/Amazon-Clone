import express from 'express'
import { createOrder, getUserOrders, deleteOrder} from '../controllers/orderController.js'

const router = express.Router()

router.post('/createOrder', createOrder)
router.get('/getOrder/:userId', getUserOrders)
router.get('/deleteOrder/:orderId', deleteOrder)

export default router