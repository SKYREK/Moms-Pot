import { ObjectId } from "mongodb";
import mongoose from "../db/conn.js";

const orderSchema = mongoose.Schema(
    {
        dishName : String,
        custId : ObjectId,
        dishId : ObjectId,
        qty : Number,
        date : {type : Date , default : Date.now},
        total : Number
    }
)
export default orderSchema