const jwt=require("jsonwebtoken")
const verifyUser=(req,res,next)=>{
   const token=req.cookies.token;
   if(!token)return res.send("unauth")
   const id=jwt.verify(token,process.env.JWT_KEY)
   console.log(token)
   console.log(id)
   res.clearCookie("token")
   console.log(token)
   next()
}

module.exports=verifyUser;