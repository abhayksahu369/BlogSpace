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
    },
    planetno:{
        type:Number,
    },
    createdat:{
        type:String,
    },

})

module.exports=mongoose.model("blogs",blogSchema)