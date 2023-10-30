const express=require("express");
const route=express.Router();
const {getAllBlogs,getUserBlogs,getaBlog,editBlog,deleteBlog,createBlog}=require("../controllers/blog")
const {verifyUser,verifyBlogUser,verifyAdmin} =require("../authMiddlewares")



route.post("/createblog",verifyAdmin,createBlog)

route.put("/editblog/:id",verifyBlogUser,editBlog)

route.delete("/deleteblog/:id",verifyBlogUser,deleteBlog)

route.get("/getallblogs",verifyUser,getAllBlogs)

route.get("/getuserblogs/:id",verifyUser,getUserBlogs)

route.get("/getablog/:id",verifyUser,getaBlog)



module.exports=route