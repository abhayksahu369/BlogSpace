const Blog=require("../models/blog")

//APIs->
//createblog
//editblog
//deleteblog
//getallblogs
//getusersblogs
//getablog

const createBlog=async(req,res,next)=>{
    try {
        if(!(req.body.heading&&req.body.blog)){
            return res.status(400).json({result:"All fields are necessary."})
        }
        let createdBlog=new Blog({
            heading:req.body.heading,
            blog:req.body.blog,
            userid:req.userid,
            planetno:req.body.planetno,
            createdat:req.body.createdat
        })
        createdBlog=await createdBlog.save()
        console.log("blog created")
        res.status(200).json(createdBlog)
    } catch (error) {
        console.log("****************error in create blog****************")
        next(error)
    }
}

const editBlog=async(req,res,next)=>{
    try {
        if(!(req.body.heading&&req.body.blog)){
            return res.status(400).json({result:"All fields are necessary."})
        }
        let editedblog=await Blog.findByIdAndUpdate(req.params.id,req.body,{new:true})
        console.log("blog edited")
        res.status(200).json(editedblog)
    } catch (error) {
        console.log("****************error in edit blog****************")
        next(error)
    }
}

const deleteBlog=async(req,res,next)=>{
    try {
        let deletedblog=await Blog.findByIdAndDelete(req.params.id)
        console.log("blog deleted")
        res.status(200).json(deletedblog)
    } catch (error) {
        console.log("****************error in delete blog****************")
        next(error)
    }
}

const getAllBlogs=async(req,res,next)=>{
    try {
        let blogs=await Blog.find()
        blogs=blogs.reverse()
        const page=parseInt(req.query.page);
        const size=parseInt(req.query.size);
        const startindex=0;
        let lastindex=page*size;
        if(blogs.length<=lastindex){
            lastindex=blogs.length;
            let sliceblogs=blogs.slice(startindex,lastindex)
            console.log(" last feed blogs are displayed")
            res.status(200).json({ blog: sliceblogs, result: "lastpage" });

        }else{
            let sliceblogs=blogs.slice(startindex,lastindex)
            console.log("feed blogs are displayed")
            res.status(200).json(sliceblogs)
        }
    } catch (error) {
        console.log("****************error in get all blogs****************")
        next(error)
    }
}

const getUserBlogs=async(req,res,next)=>{
    try {
        let userblogs=await Blog.find({userid:req.params.id})
        userblogs=userblogs.reverse()
        console.log("all user blogs are displayed")
         res.status(200).json(userblogs)
    } catch (error) {
        console.log("****************error in get user blogs****************")
        next(error)
    }
}

const getaBlog=async(req,res,next)=>{
    try {
        let userblog=await Blog.findById(req.params.id)
        console.log("a user blog is displayed")
        res.status(200).json(userblog)
    } catch (error) {
        console.log("****************error in get user one blog****************")
        next(error)
    }
}
module.exports={getAllBlogs,getUserBlogs,getaBlog,editBlog,deleteBlog,createBlog}



