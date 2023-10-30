const bcrypt = require("bcrypt")
const User = require("../models/user")
const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken")

const signUp= async (req, res,next) => {
    try {
        if (!(req.body.name && req.body.email && req.body.username && req.body.password)) {
            return res.status(400).json({ result: "all fields are necessary" })
        }
        const foundUser= await User.findOne({$or:[{email:req.body.email},{username:req.body.username}]})
        if(foundUser){
            return res.status(400).json({result:"email or username already exist."})
        }
        const hashPassword = await bcrypt.hashSync(req.body.password, 10);
        let newUser = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
            about:req.body.about,
            place:req.body.place,
            dpnumber:req.body.dpnumber,
        });
        newUser = await newUser.save();
        newUser.password = undefined;
        const token=jwt.sign({id:newUser._id},process.env.JWT_KEY)
        // res.cookie("token",token,{httpOnly:true,expires:new Date(Date.now()+1000*60*60*24*10)})
        res.status(200).json({user:newUser,auth:token})
        console.log("**********new user added************")
        console.log(newUser)
    } catch (error) {
        console.log("**********error in signup************")
        next(error)
        

    }

}



const login= async (req, res,next) => {
    try {
        if (!( req.body.email &&  req.body.password)) {
            return res.status(400).json({ result: "all fields are necessary" })
        }
         const user=await User.findOne({email:req.body.email})
         
         if(!user){
            return res.status(400).json({result:"wrong email or password"})
        }
        const comparePassword=bcrypt.compareSync(req.body.password,user.password)
        if(!comparePassword){
            return res.status(400).json({result:"wrong email or password"})
        }
        const token=jwt.sign({id:user._id},process.env.JWT_KEY)
        user.password=undefined;
        // res.cookie("token",token,{httpOnly:true,expires:new Date(Date.now()+1000*60*60*24*10)}).status(200).json(user)
        res.status(200).json({user:user,auth:token})
        console.log("**********user login************")
        console.log(user)
    } catch (error) {
        console.log("**********error in login************")
        next(error)
       

    }

}

module.exports = {signUp,login}