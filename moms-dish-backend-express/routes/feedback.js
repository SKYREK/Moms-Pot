import express from "express";
import { createFeedBack, deleteFeedBack, findFeedbackFromCook, findFeedbacksForDish, getAverageRating, updateFeedback } from "../controllers/feedbackController.js";

const feedbackRouter = express.Router();
feedbackRouter.post("/createFeedback",createFeedBack)
feedbackRouter.put("/updateFeedback",updateFeedback)
feedbackRouter.delete("/deleteFeedback",deleteFeedBack)
feedbackRouter.post("/getfeedbackByDish",findFeedbacksForDish)
feedbackRouter.post("/getfeedbackByCook",findFeedbackFromCook)
feedbackRouter.get("/avgrating/:id",getAverageRating)

export default feedbackRouter