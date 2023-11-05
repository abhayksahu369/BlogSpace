import React, { useEffect, useState } from "react";
import Card from "./Card";
import rocket from "../images/rocket.png"
import endedPic from "../images/endedPic.png"
import axios from "axios";
import Footer from "./Footer";


const HomeBlogs = () => {
    const[blogs,setBlogs]=useState([])
    const[laspage,setLastpage]=useState(false)
    const[loading,setLoading]=useState(false)
    const[next,setNext]=useState(() => {
        const storedNext = sessionStorage.getItem('next')
        return storedNext? parseInt(storedNext):1;
          
      })

    const token=JSON.parse((sessionStorage.getItem("token"))).token
    const authAxios =axios.create({
    baseURL:process.env.REACT_APP_API_ENDPOINT,
    headers:{
        Authorization:`Bearer ${token}`
    }
   })
    
   
    useEffect(()=>{
     sessionStorage.setItem('next', next);
      try {
        (async()=>{
            setLoading(true)
            const result=await authAxios.get(`${process.env.REACT_APP_API_ENDPOINT}/blog/getallblogs?page=${next}&size=10`)
            if(result.data.result){
              setLastpage(true)
              setBlogs([...result.data.blog])
              setLoading(false)
            }else{
                setBlogs([...result.data])
                setLoading(false)
            }
            

        })()
      } catch (error) {
        setLoading(false)
        console.log("error getting all the blogs in home page")
        console.error(error)
        alert("something went wrong,please try again later.")
        
      }
    },[next])

    return (
        <>
            
            {/* <div className="dp-createablog">
                <div className="dp"><img src={astro} alt="dp"/></div>
                
                <Link to="/createblog">
                    <div className="createablog">
                        <input type="text" placeholder="Create a blog " />
                    </div>
                </Link>    
                
            </div> */}
            
            <div className="homeblogsHeading">
                <h1>Discover Blogs</h1>
            </div>
            <div className="seatbelt">
                <p>Explore interesting blogs by fellow astronauts.<br/> Click to dive into their thoughts.</p>
                <img src={rocket} alt="rocket" className="fixedRocket"/>
           
            </div>
            <div className="homeblogs">

                {
                blogs.length>0?(
                    blogs.map((items) =>
                        <Card items={items} key={items._id} />
                    )):loading?<></>:<h6 style={{color:"yellow"}}>no blogs to display</h6>
                }
                {
                laspage? (
                    <div className="end">
                <img src={endedPic} alt="img"></img>
                <p>Exploration finished!</p>

            </div>):
            <>
            {
                loading?
                <p style={{color:"aliceblue",fontSize:"10px"}}>Loading Blogs...</p>:
                 <p style={{color:"yellow"}} onClick={()=>setNext(next+1)}>Load More</p>
            } 
           
            <br/><br/><br/><br/><br/>
            </>
            
             }
             
              <Footer/>
                
            </div>
           
                
            
         
          

        </>
    )
}

export default  HomeBlogs;