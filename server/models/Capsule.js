import mongoose,{Schema} from "mongoose";


const CapsuleSchema= new mongoose.Schema({})



const Capsule=mongoose.model("Capsule",CapsuleSchema)

export default Capsule;