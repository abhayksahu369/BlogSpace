import { useState } from "react";

const SearchUser=()=>{
    const[search,setSearch]=useState("")
    return(
        
        <>
        <br/><br/><br/>
        <input type="text" placeholder="Search User" value={search}  />
        </>
    )
}
export default SearchUser;