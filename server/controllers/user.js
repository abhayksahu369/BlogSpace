const User=require("../models/user")

const getaUser=async(req,res,next)=>{
    try {
        const user=await User.findById(req.params.id)
        user.password=undefined
        console.log("a user is displayed")
        res.status(200).json(user)
    } catch (error) {
        console.log("***********error in get a user*************")
        next(error)
    }
}

const editUser=async(req,res,next)=>{
    try {
        if(req.userid!==req.params.id) return  res.status(401).json({ message: 'unauthorized user' });
        const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
        user.password=undefined
        console.log("user edited")
        res.status(200).json(user)
    } catch (error) {
        console.log("***********error in editing user*************")
        next(error)
    }
}

const getAllUsers=async(req,res,next)=>{
    try {
        let users=await User.find().select("-password")
        users=users.reverse()
        const page=parseInt(req.query.page);
        const size=parseInt(req.query.size);
        const startindex=0;
        let lastindex=page*size;
        if(users.length<=lastindex){
            lastindex=users.length;
            let sliceusers=users.slice(startindex,lastindex)
            console.log(" last page user are displayed")
            res.status(200).json({ user: sliceusers, result: "lastpage" });

        }else{
            let sliceusers=users.slice(startindex,lastindex)
            console.log("users are displayed")
            res.status(200).json(sliceusers)
        }
        
    } catch (error) {
        console.log("***********error in get all user*************")
        next(error)
    }
}
const searchUsers=async(req,res,next)=>{
    try{
       const result =await User.find({$or:[{name:{$regex:req.params.key,$options: 'i'}},{username:{$regex:req.params.key,$options: 'i'}}]}).select("-password")
       res.status(200).json(result)
    }catch(error){
        console.log("***********error in searching *********")
        next(error)
    }
}

module.exports={getAllUsers,getaUser,editUser,searchUsers}
