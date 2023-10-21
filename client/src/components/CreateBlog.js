import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";




const CreateBlog=()=>{
    const[heading,setHeading]=useState("")
    const[blog,setBlog]=useState("")
    const[userid,setUserid]=useState("")
    const navigate=useNavigate()
    const id=JSON.parse(localStorage.getItem("id")).id
    
    


    const handleCreateBlog=async()=>{
       try {
        if(!(heading&&blog))return alert("all fields are necessary.")
        const result=await axios.post("http://localhost:5000/api/blog/createblog",{heading,blog,userid:id})
         navigate("/")
       } catch (error) {
         console.log("error while creating blog")
         console.error(error);
         alert("something went wrong,please try again.")
       }
    }
    return(
        <div className="createblog">
        <h1>CREATE A BLOG</h1>
       
        <textarea className="heading" placeholder="Write a short 7-8 word heading for your blog (to be shown in the feed)." value={heading}  onChange={(e)=>{setHeading(e.target.value)}}/><br/>
        <textarea className="blog" placeholder="Share your thoughts, experiences, or stories here (short or long,any category)." value={blog} onChange={(e)=>{setBlog(e.target.value)}}/><br/>
        <button onClick={handleCreateBlog}>GO</button>



        </div>
        
    )
}
export default CreateBlog;