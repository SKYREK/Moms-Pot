import mongoose from "mongoose";
import "../loadEnvironment.js"

mongoose.connect(process.env.ATLAS_URI,{

  useNewUrlParser: true,
  useUnifiedTopology: true

}).then((result)=>{

  

})
export default mongoose
