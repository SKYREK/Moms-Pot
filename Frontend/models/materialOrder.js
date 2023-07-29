import { ObjectId } from "mongodb";
import mongoose from "../db/conn.js";

const materialOrderSchema = mongoose.Schema(
    {
        custId : ObjectId,
        supplierId : ObjectId,
        materialId : ObjectId,
        qty : Number,
        date : {type : Date , default : Date.now},
        total : Number,
        materialName : String,

    }
)
export default materialOrderSchema