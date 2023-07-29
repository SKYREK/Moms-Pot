import { ObjectId, Timestamp } from "mongodb";
import mongoose from "../db/conn.js"

    

const materialSchema = mongoose.Schema(
    
    {     
        supplierId : ObjectId, 
        name : String,
        description : String,
        price: Number,
        unit : String,
        quanta : Number,
        date : {type : Date  , default : Date.now}

    },{timestamp :    true}
)

    

 export default materialSchema;