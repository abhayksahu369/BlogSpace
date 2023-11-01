const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const cookieParser=require("cookie-parser")
require('dotenv').config()
const issueModel=require("./models/reportedissues")
const messagesModel=require("./models/messages")

const authRoute=require("./routes/auth")
const blogsRoute=require("./routes/blog")
const userRoute=require("./routes/user")

const app=express()

const dbConnect=()=>{
    try {
        mongoose.connect(process.env.MONGODB_LINK)
        console.log("connected to DB")
    } catch (error) {
        throw error;
        
    }

}

app.use(cors({
    origin:["https://blogspace44.onrender.com"],
    // origin:["https://blogspace96.netlify.app"],
    credentials:true,
}))
app.use(cookieParser())
app.use(express.json())



app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)
app.use("/api/blog",blogsRoute)

app.post("/api/reportanissue",async(req,res,next)=>{
    try {
        let result=new issueModel(req.body)
        result=await result.save()
        console.log("issue reported")
        res.status(200).json(result)
    } catch (error) {
        console.log("****************error in report issue****************")
        next(error)
    }
})
app.post("/api/contactus",async(req,res,next)=>{
    try {
        let result=new messagesModel(req.body)
        result=await result.save()
        console.log("message saved")
        res.status(200).json(result)
    } catch (error) {
        console.log("****************error in recieving message****************")
        next(error)
    }
})

app.use((err,req,res,next)=>{
    console.log(err)
    res.status(err.status||400).json(err)

})

app.listen(5000,()=>{
    console.log("server started")
    dbConnect()
})
