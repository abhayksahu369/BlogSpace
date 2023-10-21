const express=require("express");
const route=express.Router();
const {getAllUsers,getaUser,editUser}=require("../controllers/user")

route.get("/getauser/:id",getaUser)

route.put("/edituser/:id",editUser)

route.get("/getallusers",getAllUsers)

module.exports=route