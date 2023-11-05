import React from "react";
import {Outlet,Navigate} from "react-router-dom"

const PrivateComponent=()=>{
    const auth=sessionStorage.getItem("token")
    return auth?<Outlet/>:<Navigate to ="/guestpage" />
}
export default PrivateComponent;

