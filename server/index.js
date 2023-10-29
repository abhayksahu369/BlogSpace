const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const cookieParser=require("cookie-parser")
require('dotenv').config()

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
    // origin:["http://localhost:3000"],
    origin:["https://blogspace96.netlify.app"],
    credentials:true,
}))
app.use(cookieParser())
app.use(express.json())



app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)
app.use("/api/blog",blogsRoute)

app.use((err,req,res,next)=>{
    console.log(err)
    res.status(err.status||400).json(err)

})

app.listen(5000,()=>{
    console.log("server started")
    dbConnect()
})