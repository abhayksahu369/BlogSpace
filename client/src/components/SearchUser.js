import axios from "axios";
import { useEffect, useState } from "react";
import Nav from "./homepage/Nav";
import Footer from "./homepage/Footer";
import { Link } from "react-router-dom";

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
        getusers()   
    },[])
    
    const getusers=async()=>{
        const result= await authAxios.get(`${process.env.REACT_APP_API_ENDPOINT}/user/getallusers`)
        setUsers(result.data)
        console.log(result.data)
    }

    const handleSearch=async(e)=>{
        if(e.target.value){
            const result=await authAxios.get(`${process.env.REACT_APP_API_ENDPOINT}/user/searchusers/${e.target.value}`)
            setUsers(result.data)
            console.log(result.data)
        }else{
            getusers()
        }
        // if(e.target.value.length>0){
        //    
        // }

    }
    return(
        <>
        <div className="searchInput">
        <input type="text" placeholder="Search User"  onChange={handleSearch}  />
        </div>
        <h1 className="spaceExplorers">Space Explorers</h1>

        <div className="usersList">
            {
                users.length>0?
                <>
                {
                    users.map((items)=>
                    <Link to={`/userprofile/${items._id}`}>
                        <div className="userContent" style={{color:"yellow"}} key={items._id}>
                        <img src= {`https://raw.githubusercontent.com/abhayksahu369/images/main/astronauts/astronaut${items.dpnumber}.png`} alt=""/>
                        <div className="usercontentRight">
                            <h5>{items.username}</h5>
                            <p>{items.name}</p>
                        </div>
                        </div>
                        </Link>
                    )
                    
                }

                </>:<></>

            }
            
        </div>
        <Footer/>
        </>
    )
}
export default SearchUser;