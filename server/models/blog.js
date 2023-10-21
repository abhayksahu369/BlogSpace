const mongoose=require("mongoose")
const blogSchema=new mongoose.Schema({
    heading:{
        required:true,
        type:String
    },
    blog:{
        required:true,
        type:String
    },
    userid:{
        required:true,
        type:String
    }
},{timestamps:true})

module.exports=mongoose.model("blogs",blogSchema)