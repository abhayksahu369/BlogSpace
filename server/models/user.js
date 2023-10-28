const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    username:{
        required:true,
        unique:true,
        type:String
    },
    email:{
        required:true,
        unique:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
    about:{
        type:String
    },
    place:{
       type:String
    },
    dpnumber:{
        type:Number,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model("users",userSchema)