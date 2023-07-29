import mongoose from "../db/conn.js"

    

const userSchema = mongoose.Schema(
    
    {      
        email : String,
        passwordHash : String,
        firstName: String,
        lastName: String,
        location: String,
        cookAccount : Boolean,
        saleAccount : Boolean
    }
)

    

 export default userSchema;