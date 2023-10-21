import React from "react";
import dp from "../images/astro.png"
import { Link } from "react-router-dom";

const Footer=()=>{
    return(
        <>
         <div className="footer">
         <Link to="/"><i class="ri-home-3-fill ri-2x"></i></Link>
         <Link to="/createblog"><i class="ri-add-circle-fill ri-2x"></i></Link>
          <Link to="/myprofile"><img src={dp} alt="profile"></img> </Link>
                 
        </div> 
        </>
    )
}
export default Footer;