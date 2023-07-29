import express from "express";
import { createMaterial, deleteMaterial, getMaterialByUserId, getMaterialDetails, getMaterialList, getMaterialsByQuery, updateMaterial } from "../controllers/materialController.js";


const materialRouter = express.Router();
materialRouter.post("/createMaterial",createMaterial)
materialRouter.put("/updateMaterial",updateMaterial)
materialRouter.delete("/deleteMaterial",deleteMaterial)
materialRouter.get("/getMaterial",getMaterialDetails)
materialRouter.post("/getMaterialBySupplier",getMaterialByUserId)
materialRouter.get("/search/:query",getMaterialsByQuery)
materialRouter.get("/",getMaterialList)

export default materialRouter