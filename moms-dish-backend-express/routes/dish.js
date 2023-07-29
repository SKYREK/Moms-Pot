import express from "express";
import { createDish, deleteDish, getDishDetails, getDishesByCook, getDishesByQuery, getFavDishList, updateDish } from "../controllers/dishControllers.js";

const dishRouter = express.Router();
dishRouter.post("/createDish",createDish)
dishRouter.put("/updateDish",updateDish)
dishRouter.delete("/deleteDish",deleteDish)
dishRouter.get("/getDish",getDishDetails)
dishRouter.get("/getFavDishList",getFavDishList)
dishRouter.post("/getDishesByCook",getDishesByCook)
dishRouter.get("/search/:query",getDishesByQuery)
export default dishRouter