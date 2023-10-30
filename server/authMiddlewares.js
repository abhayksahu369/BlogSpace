const jwt=require("jsonwebtoken")
const Blog=require("./models/blog")
const verifyUser=(req,res,next)=>{
   const result=req.headers.authorization;
   if (!result) {
      return res.status(401).json({ message: 'unauthorized' });
    }
   token=result.split(" ")[1]
   jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'token is invalid' });
      }
      console.log("user verification")
       req.userid=decoded.id
      next();
    });
  
}

const verifyBlogUser=(req,res,next)=>{
   const result=req.headers.authorization;
   if (!result) {
      return res.status(401).json({ message: 'unauthorized' });
    }
   token=result.split(" ")[1]
   jwt.verify(token, process.env.JWT_KEY, async(err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'token is invalid' });
      }
         try {
             let userblog=await Blog.findById(req.params.id)
             if(decoded.id===userblog.userid){
              console.log("blog user verification")
               req.userid=decoded.id
               next();
             }else{
               return res.status(401).json({ message: 'aunthorized user' });
             }
         } catch (error) {
             console.log("****************error in get user one blog in middleware****************")
             next(error)
         }
     
   
      
    });
  
}

const verifyAdmin=(req,res,next)=>{
   const result=req.headers.authorization;
   if (!result) {
      return res.status(401).json({ message: 'unauthorized' });
    }
   token=result.split(" ")[1]
   jwt.verify(token, process.env.JWT_KEY, async(err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'token is invalid' });
      }
      console.log("admin check")
      req.userid=decoded.id
      next();
            
        
     
   
      
    });
  
}

module.exports={verifyUser,verifyBlogUser,verifyAdmin};