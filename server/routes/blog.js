const express=require("express");
const route=express.Router();
const {getAllBlogs,getUserBlogs,getaBlog,editBlog,deleteBlog,createBlog}=require("../controllers/blog")
const verifyUser =require("../verifyUser")



route.post("/createblog",createBlog)

route.put("/editblog/:id",editBlog)

route.delete("/deleteblog/:id",deleteBlog)

route.get("/getallblogs",getAllBlogs)

route.get("/getuserblogs/:id",getUserBlogs)

route.get("/getablog/:id",getaBlog)



module.exports=route