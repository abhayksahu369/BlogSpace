import React from "react";
import { Link } from "react-router-dom";




const Footer=()=>{
   const auth=JSON.parse(sessionStorage.getItem("id"))
    return(
        <>
        {
          auth?  (
            <div className="footer">
            <Link to="/"><i className="ri-home-3-fill ri-2x"></i></Link>
            <Link to="/createblog"><i className="ri-add-circle-fill ri-2x"></i></Link>
             <Link to="/myprofile">< i className="ri-user-fill ri-2x"></i></Link>
                    
           </div> 
          ):<></>
        }
        
        </>
    )
}
export default Footer;