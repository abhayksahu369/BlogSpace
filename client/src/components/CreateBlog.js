import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./homepage/Footer";
import ClipLoader from "react-spinners/ClipLoader"



const CreateBlog=()=>{
    const[heading,setHeading]=useState("")
    const[blog,setBlog]=useState("")
    const [loading, setLoading] = useState(false)
    const navigate=useNavigate()
    const id=JSON.parse(localStorage.getItem("id")).id
    
    


    const handleCreateBlog=async()=>{
       try {

        if(!(heading&&blog))return alert("all fields are necessary.")
        const planetno=Math.floor( Math.random()*21 + 1)
        const createdat=new Date(Date.now());
        setLoading(true)
        const result=await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/blog/createblog`,{heading,blog,userid:id,planetno,createdat})
        setLoading(false)
        alert("BLOG LAUNCHED!!")
        navigate("/")
       } catch (error) {
        setLoading(false)
         console.log("error while creating blog")
         console.error(error);
         alert("something went wrong,please try again.")
       }
    }
    return(
      <>
        <div className="createblog">
        <h1>Launch Your Blog into Orbit</h1>
        <p>Prepare for launch! Craft your blog post, share your wisdom, and let your thoughts orbit the minds of fellow astronauts. Your words can become celestial bodies in this cosmic library.</p>
        <textarea className="heading" placeholder="Write a short 7-8 word heading for your blog (to be shown in the feed)." value={heading}  onChange={(e)=>{if(e.target.value.length<51)setHeading(e.target.value)}}/><br/>
        <textarea className="blog" placeholder="Share your thoughts, experiences, or stories here (short or long,any category)." value={blog} onChange={(e)=>{setBlog(e.target.value)}}/><br/>
        {loading?<ClipLoader color="yellow" />:<button onClick={handleCreateBlog}>LAUNCH</button>}
         <br/><br/><br/><br/><br/>


        </div>
        <Footer/>
        </>
        
    )
}
export default CreateBlog;