import { useParams } from "react-router-dom"
import Card from "./homepage/Card"
import profile from "./images/astro2.png"
import axios from "axios";
import { useEffect, useState } from "react";

const UserProfile = () => {
    const[user,setUser]=useState({});
    const[blogs,setBlogs]=useState([]);
    const {id}=useParams();
    useEffect(()=>{
       getUser()
       getBlogs()
    },[])
    
    const getUser=async()=>{
        try {
           const  result=await axios.get(`http://localhost:5000/api/user/getauser/${id}`)
            setUser(result.data);
    
        } catch (error) {
            console.log("error while getting a user.")
            console.error(error)
            alert("something went wrong please try again later.")
        }
    }
    const getBlogs=async()=>{
        try {
            const result=await axios.get(`http://localhost:5000/api/blog/getuserblogs/${id}`)
            setBlogs(result.data)
    
        } catch (error) {
            console.log("error while getting a user.")
            console.error(error)
            alert("something went wrong please try again later.")
        }
    }
    
    return (
        <>
           <h1 className="mygalaxy">{user.username}'s galaxy</h1>
            <div className="myprofiletop">
                <img src={profile} alt=""></img>
                <div className="myprofiletopright" >
                    <h4>{user.username}</h4>
                    <p>{user.name}</p>
                    <p>{user.about}</p>
                    <p>{user.place}</p>
                    
                </div>
            </div>
            <div className="myprofilebottom">
            {
                blogs.length>0?(               
                    blogs.map((items) =>
                        <Card items={items} />
                    )):<h4 style={{color:"yellow"}}>no blogs to display.</h4>
            }

            </div>
        </>
    )
}
export default UserProfile;