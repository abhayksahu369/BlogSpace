import React, { useEffect, useState } from "react";
import astro from "./images/astro2.png"
import planet from "./images/planet.png"
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Blog=()=>{
    const[blog,setBlog]=useState({})
    const[user,setUser]=useState({})
    const{userid,blogid}=useParams();
    
    useEffect(()=>{
        getUser()
        getBlog()
     },[])
     
     const getUser=async()=>{
         try {
            const  result=await axios.get(`http://localhost:5000/api/user/getauser/${userid}`)
             setUser(result.data);
     
         } catch (error) {
             console.log("error while getting a user.")
             console.error(error)
             alert("something went wrong please try again later.")
         }
     }
     const getBlog=async()=>{
         try {
             const result=await axios.get(`http://localhost:5000/api/blog/getablog/${blogid}`)
             setBlog(result.data)
     
         } catch (error) {
             console.log("error while getting a user.")
             console.error(error)
             alert("something went wrong please try again later.")
         }
     }
     
    return(
        <>
        <br/><br/><br/>
        
         <div className="cardTop">
                    <div className="cardTopLeft">

                        <Link to={`/userprofile/${user._id}`}> <div className="profilePhoto"><img src={astro} alt="profile" /></div></Link>
                        <Link to={`/userprofile/${user._id}`}><div className="cardUsername">{user.username}</div></Link>
                    </div>
                    <img src={planet} alt="planet" />

          </div>
          <div className="blogcontent" style={{color:"white"}}>
            <h1>{blog.heading}</h1>
            {blog.blog}
            
          </div>
          
        
        </>
    )
}

export default Blog;