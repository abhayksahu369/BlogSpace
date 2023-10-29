import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
const Nav = () => {
   
    return (
        <>
            <div className="nav">
                 <Link to="/menu"><i className="ri-menu-line ri-2x"></i></Link>
                <h1>BLOGSPACE</h1>
                <i className="ri-user-search-fill ri-2x"></i>
                
                


            </div>

        </>
    )
}
export default Nav;