import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
const EditBlog=()=>{
    const[heading,setHeading]=useState("")
    const[blog,setBlog]=useState("")
    const navigate=useNavigate()
    const{id}=useParams()
    useEffect(()=>{
     getblog()
    },[])
    
    const getblog=async()=>{
       try {
         const result=await axios.get(`http://localhost:5000/api/blog/getablog/${id}`)
         if(!result.data.heading) return alert("something went wrong,please try again later.")
         setHeading(result.data.heading)
        setBlog(result.data.blog)
       } catch (error) {
            console.log("error in getting a blog.")
            console.error(error)
            alert("something went wrong,please try again later.")
       }
    }
    
    
    const handleEditBlog=async()=>{
        try {
            if(!(heading&&blog)) return alert("all fields are necessary.")
            const result= await axios.put(`http://localhost:5000/api/blog/editblog/${id}`,{heading,blog})
            if(!result.data.heading) return alert("something went wrong,please try again later.")
            navigate("/myprofile")
            
        } catch (error) {
            console.log("error in editting a blog.")
            console.error(error)
            alert("something went wrong,please try again later.")
        }
    }
    return(
        <div className="createblog">
        <h1> EDIT BLOG</h1>
       
        <textarea className="heading" placeholder="Write a short 7-8 word heading for your blog (to be shown in the feed)." value={heading}  onChange={(e)=>{setHeading(e.target.value)}}/><br/>
        <textarea className="blog" placeholder="Share your thoughts, experiences, or stories here (short or long,any category)." value={blog} onChange={(e)=>{setBlog(e.target.value)}}/><br/>
        <button onClick={handleEditBlog} >EDIT</button>



        </div>
        
    )
}
export default EditBlog;