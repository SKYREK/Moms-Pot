import express from 'express'
import { getPlacedOrders, getRecievedOrders, placeOrder } from '../controllers/orderController.js'

const orderRouter = express.Router()
orderRouter.post("/placeOrder", placeOrder)
orderRouter.post("/placedOrders", getPlacedOrders)
orderRouter.post("/receivedOrders",getRecievedOrders)

export default orderRouter