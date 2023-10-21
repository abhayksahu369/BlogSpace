import React, { useEffect, useState } from "react";
import Card from "./Card";
import astro from "../images/astro.png";
import rocket from "../images/rocket.png"
import endedPic from "../images/endedPic.png"
import { Link } from "react-router-dom";
import axios from "axios";

const HomeBlogs = () => {
    const[blogs,setBlogs]=useState([])
    useEffect(()=>{
      try {
        (async()=>{
            const result=await axios.get("http://localhost:5000/api/blog/getallblogs")
            setBlogs(result.data)
            console.log(blogs)

        })()
      } catch (error) {
        console.log("error getting all the blogs in home page")
        console.error(error)
        alert("something went wrong,please try again later.")
        
      }
    },[])

    return (
        <>
            
            <div className="dp-createablog">
                <div className="dp"><img src={astro} alt="dp"/></div>
                
                <Link to="/createblog">
                    <div className="createablog">
                        <input type="text" placeholder="Create a blog " />
                    </div>
                </Link>    
                
            </div>
            <div className="seatbelt">
                <p> Fasten your rocket seatbelt and prepare to explore<br/> CAPTAIN!!!</p>
                <img src={rocket} alt="rocket" className="fixedRocket"/>
           
            </div>
            <div className="homeblogs">

                {
                blogs.length>0?(
                    blogs.map((items) =>
                        <Card items={items} />
                    )):<h1>no blogs to display</h1>
                }

            </div>
            <div className="end">
                <img src={endedPic} alt="img"></img>
                <p>Exploration finished!</p>

            </div>
         


        </>
    )
}

export default HomeBlogs;