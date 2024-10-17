import mongoose,{Schema,models} from "mongoose";


const courseSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    lectures:[]
},
  { timestamps: true })

  const course = models.Course || mongoose.model("Course",courseSchema)
  export default course