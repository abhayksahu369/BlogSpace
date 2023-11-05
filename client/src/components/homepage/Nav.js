import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
const Nav = () => {
   const handleWhetherSearch=()=>{
    const token=sessionStorage.getItem("token")
    if(!token){
        alert("you must sign in first to search astronauts.")
    }
   }
    return (
        <>
            <div className="nav">
                 <Link to="/menu"><i className="ri-menu-line ri-2x"></i></Link>
                <h1>BLOGSPACE</h1>
                <Link to="/searchuser" ><i onClick={handleWhetherSearch} className="ri-user-search-fill ri-2x"></i></Link>
                
                


            </div>

        </>
    )
}
export default Nav;