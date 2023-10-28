import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";




const Footer=()=>{
   const auth=JSON.parse(localStorage.getItem("id"))
    return(
        <>
        {
          auth?  (
            <div className="footer">
            <Link to="/"><i class="ri-home-3-fill ri-2x"></i></Link>
            <Link to="/createblog"><i class="ri-add-circle-fill ri-2x"></i></Link>
             <Link to="/myprofile">< i class="ri-user-fill ri-2x"></i></Link>
                    
           </div> 
          ):<></>
        }
        
        </>
    )
}
export default Footer;