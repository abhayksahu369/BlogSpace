const mongoose=require("mongoose")
const issueSchema=new mongoose.Schema({
    issue:{
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

module.exports=mongoose.model("reportedissues",issueSchema)