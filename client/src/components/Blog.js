import React, { useEffect, useState } from "react";
import astro from "./images/astro2.png"
import planet from "./images/planet.png"
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "./homepage/Footer";


const Blog = () => {
    const [blog, setBlog] = useState({})
    const [user, setUser] = useState({})
    const[dpnumber,setDpnumber]=useState("")
    const[planetno,setPlanetno]=useState("")
    const[date,setDate]=useState("")
    const { userid, blogid } = useParams();
    const localid=JSON.parse(localStorage.getItem("id")).id
    const navigate=useNavigate();
    useEffect(() => {
        getUser()
        getBlog()
        
    }, [])

    const getTime=(createdat)=>{
        const minute=1000*60;
        const hour=minute*60;
        const day=hour*24;
        const postedAgo = new Date(Date.now())-new Date(createdat)
        if(postedAgo<minute){
            const date="just now";
            setDate(date)
        }else if(postedAgo<hour){
            if(Math.floor(postedAgo/minute)<2){
               setDate(`${Math.floor(postedAgo/minute)} minute ago`) 
            }else{
               setDate(`${Math.floor(postedAgo/minute)} minutes ago`)
            }
        }else if(postedAgo<day){
            if(Math.floor(postedAgo/hour)<2){
              setDate(`${Math.floor(postedAgo/hour)} hour ago` )
            }else{
               setDate(`${Math.floor(postedAgo/hour)} hours ago`)
            }   
        }else{
            if(Math.floor(postedAgo/day)<2){
                setDate(`${Math.floor(postedAgo/day)} day ago`) 
            }else{
                setDate(`${Math.floor(postedAgo/day)} days ago`)
            }
        }


    }

    const getUser = async () => {
        try {
            const result = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/user/getauser/${userid}`)
            setUser(result.data);
            setDpnumber(result.data.dpnumber)
            

        } catch (error) {
            console.log("error while getting a user.")
            console.error(error)
            alert("something went wrong please try again later.")
        }
    }
    const getBlog = async () => {
        try {
            const result = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/blog/getablog/${blogid}`)
            setBlog(result.data)
            setPlanetno(result.data.planetno)
            getTime(result.data.createdat)

        } catch (error) {
            console.log("error while getting a user.")
            console.error(error)
            alert("something went wrong please try again later.")
        }
    }
    const handleDelete=async()=>{
        try {
            const deleteBLog=window.confirm("Delete this blog?")
            if(deleteBLog){
                await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/blog/deleteblog/${blogid}`)
                back()  
            }
            
        } catch (error) {
            console.log("error in deleting a blog.")
            console.error(error)
            alert("something went wrong please try again later.")
        }
    }
    const back=()=>{
        window.history.back();
    }

    return (
        <>
            <br /><br /><br />

            <div className="cardTop">
                <div className="cardTopLeft">

                    <Link to={`/userprofile/${user._id}`}> <div className="profilePhoto"><img src={`https://raw.githubusercontent.com/abhayksahu369/images/main/astronauts/astronaut${dpnumber}.png`} alt="profile" /></div></Link>
                    <Link to={`/userprofile/${user._id}`}><div className="cardUsername">{user.username}</div></Link>
                </div>
                <div className="cardTopRight">
                    <p style={{ color: "yellow" }}>{date}</p>
                    <img src={`https://raw.githubusercontent.com/abhayksahu369/images/main/planets/planet${planetno}.png`} alt="planet" />
                </div>

            </div>
            <div className="blogcontent" >
            <div className="blogcontentBottom">
                {
                 localid===userid?
                 <div className="blogcontentBottomHandle">
                 <Link to={`/updateblog/${blogid}`}>
                 <i class="ri-edit-box-fill ri-2x"></i>
                </Link>
                <div className="delete" onClick={handleDelete}>
                <i class="ri-delete-bin-2-fill ri-2x"></i>
                </div>
               
               </div>:
               <></>

                }
                </div>
                <h2>{blog.heading}</h2>
                <p>{blog.blog}</p>
                {
                 localid===userid?
                 <></>:
               <div className="blogcontentBottomText">
                <Link to={`/userprofile/${user._id}`}><p>Explore {user.username}'s Galaxy</p></Link>
               </div>

                }

            </div>

         <Footer/>
        </>
    )
}

export default Blog;