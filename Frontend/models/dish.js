import { ObjectId } from "mongodb";
import mongoose from "../db/conn.js"

    

const dishSchema = mongoose.Schema(
    
    {     
        cookId : ObjectId, 
        name : String,
        description : String,
        price: Number,
        isFixed: Boolean,
        isAllergy : Boolean,
        ingredients  : [String],
        date : {type : Date  , default : Date.now},
        hitCount :{type : Number , default : 0}
    }
)

    

 export default dishSchema;