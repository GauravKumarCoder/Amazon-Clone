import express from 'express'
import { createOrder, getUserOrders} from '../controllers/orderController.js'

const router = express.Router()

router.post('/createOrder', createOrder)
router.get('/getOrder/:userId', getUserOrders)

export default router