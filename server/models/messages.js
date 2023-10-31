const mongoose=require("mongoose")
const messageSchema=new mongoose.Schema({
    message:{
        required:true,
        type:String
    },
    
    userid:{
        required:true,
        type:String
    },
    name:{
        required:true,
        type:String
    },
    createdat:{
        type:String,
    },

})

module.exports=mongoose.model("messages",messageSchema)