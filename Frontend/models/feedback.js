import { ObjectId } from "mongodb";
import mongoose from "../db/conn.js";

const feedbackSchema = mongoose.Schema(
    {
        userId : ObjectId,
        dishId : ObjectId,
        rating : Number,
        date : {type : Date , default : Date.now},
        description :String
    }
)
export default feedbackSchema;