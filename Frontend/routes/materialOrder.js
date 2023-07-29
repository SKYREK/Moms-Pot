import express from 'express'
import { getPlacedMaterialOrder, getRecievedMaterialOrders, getRecived, placeMaterialOrder } from '../controllers/materialOrderController.js'


const materialOrderRouter = express.Router()
materialOrderRouter.post("/placeMaterialOrder", placeMaterialOrder)
materialOrderRouter.get("/placedMaterialOrders", getPlacedMaterialOrder)
materialOrderRouter.get("/receivedMaterialOrders",getRecived)

export default materialOrderRouter