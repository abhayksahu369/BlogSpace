import axios from "axios";
import { useEffect, useState } from "react";

const SearchUser=()=>{
    const[search,setSearch]=useState("")
    const[users,setUsers]=useState([])
    const token = JSON.parse((localStorage.getItem("token"))).token
    const authAxios = axios.create({
        baseURL: process.env.REACT_APP_API_ENDPOINT,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    
    useEffect(()=>{
        const getusers=async()=>{
            const result= await authAxios.get(`${process.env.REACT_APP_API_ENDPOINT}/user/getallusers`)
            setUsers(result.data)
            console.log(result.data)
        }
        getusers()
        
    },[])
    return(
        <>
        <div className="searchInput">
        <input type="text" placeholder="Search User" value={search}  />
        </div>
        <div className="usersList">
            {
                users.length>0?
                <>
                {
                    users.map((items)=>
                        <div className="userContent" style={{color:"yellow"}} key={items._id}>
                        <img src= {`https://raw.githubusercontent.com/abhayksahu369/images/main/astronauts/astronaut${items.dpnumber}.png`} alt=""/>
                        <div className="usercontentRight">
                            <h6>{items.username}</h6>
                            <p>{items.name}</p>
                        </div>
                        </div>
                    )
                }

                </>:<></>

            }
            
        </div>
        </>
    )
}
export default SearchUser;