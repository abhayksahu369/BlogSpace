import { Link, useParams } from "react-router-dom"
import Card from "./homepage/Card"
import profile from "./images/astro2.png"
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "./homepage/Footer";
import ClipLoader from "react-spinners/ClipLoader"

const UserProfile = () => {
    const[user,setUser]=useState({});
    const[blogs,setBlogs]=useState([]);
    const[loadinguser,setLoadinguser]=useState(false)
    const[loadingblog,setLoadingblog]=useState(false)
    const[dpnumber,setDpnumber]=useState("");
    const {id}=useParams();
    useEffect(()=>{
       getUser()
       getBlogs()
    },[])
    
    const getUser=async()=>{
        try {
            setLoadinguser(true)
            const  result=await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/user/getauser/${id}`)
            setUser(result.data);
            setDpnumber(result.data.dpnumber)
            setLoadinguser(false)
          } catch (error) {
            setLoadinguser(false)
            console.log("error while getting a user.")
            console.error(error)
            alert("something went wrong please try again later.")
        }
    }
    const getBlogs=async()=>{
        try {
            setLoadingblog(true)
            const result=await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/blog/getuserblogs/${id}`)
            setBlogs(result.data)
            setLoadingblog(false)
    
        } catch (error) {
            setLoadingblog(false)
            console.log("error while getting a user.")
            console.error(error)
            alert("something went wrong please try again later.")
        }
    }
    
    return (
        <>
           {
           loadinguser?<><br/><br/><br/><div style={{textAlign:"center"}}><ClipLoader color="yellow"  /></div></>:
           (
           <>
           <h1 className="mygalaxy"> {user.username}'s Galaxy</h1>
            <div className="myprofiletop">
                <img src={`https://raw.githubusercontent.com/abhayksahu369/images/main/astronauts/astronaut${dpnumber}.png`} alt=""></img>
                <div className="myprofiletopright" >
                    <h2>{user.username}</h2>
                    <p>{user.name}</p>
                    <p>{user.about}</p>
                    <p>{user.place}</p>
                    
                </div>
            </div>
            </>
           )
           }
            
            <div className="myprofilebottom">
            {loadingblog?<p style={{color:"aliceblue",fontSize:"10px"}}>Loading Blogs...</p>:<></>}
            {
                blogs.length>0?(               
                    blogs.map((items) =>(
                        <>
                        <Card items={items} />
                        
                        </>
                    )
                    )):<> {loadingblog?<></>:<h4 style={{color:"yellow"}}>no blogs to display.</h4>}</>
            }
            
            {
               blogs.length > 0? <h6>"Congratulations! You've explored all of {user.username}'s blogs</h6>:<></>
            }
             
            </div>
            
            <br/><br/><br/><br/>
            <Footer/>
        </>
    )
}
export default UserProfile;