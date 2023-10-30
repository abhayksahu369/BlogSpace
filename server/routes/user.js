const express=require("express");
const route=express.Router();
const {getAllUsers,getaUser,editUser,searchUsers}=require("../controllers/user")
const {verifyUser,verifyAdmin} =require("../authMiddlewares")

route.get("/getauser/:id",verifyUser,getaUser)

route.put("/edituser/:id",verifyAdmin,editUser)

route.get("/getallusers",verifyUser,getAllUsers)

route.get("/searchusers/:key",verifyUser,searchUsers)

module.exports=route