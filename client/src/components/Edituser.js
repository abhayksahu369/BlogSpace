import axios from "axios"
import { useEffect, useState } from "react"




const Edituser=()=>{
    const[name,setName]=useState("")
    const[username,setUsername]=useState("")
    const[email,setEmail]=useState("")
    const[about,setAbout]=useState("")
    const[place,setPlace]=useState("")
    const id=JSON.parse(localStorage.getItem("id")).id
    useEffect(()=>{
      getUser();
    },[])
    const getUser = async () => {
        try {
            const result = await axios.get(`http://localhost:5000/api/user/getauser/${id}`)
            setName(result.data.name)
            setUsername(result.data.username)
            setEmail(result.data.email)
            setAbout(result.data.about)
            setPlace(result.data.place)
            
            } catch (error) {
            console.log("error while getting a user.")
            console.error(error)
            alert("something went wrong please try again later.")
        }
    }
    const handleEdituser=async()=>{
        try {
            const result=await axios.put(`http://localhost:5000/api/user/edituser/${id}`,{name,username,email,about,place})
            console.log("user edited")
            console.log(result.data)
        } catch (error) {
            console.log("error in editing a user")
            console.log(error);
            if(error.response.data.result)return alert(error.response.data.result)
            alert("something went wrong please try again later.")
            
        }

    }
    return(
        <>
        <br/><br/><br/>
        <div style={{color:"yellow"}}>
        <h2>Edit Profile</h2>
        <p>Full Name</p>
        <input type="text" placeholder="Full Name" value={name} onChange={(e)=>{setName(e.target.value)}} />
        <p>Username</p>
        <input type="text" placeholder="Username" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
        <p>Email</p>
        <input type="text" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
        <p>About</p>
        <input type="text" placeholder="About" value={about} onChange={(e)=>{setAbout(e.target.value)}} />
        <p>Place</p>
        <input type="text" placeholder="Place" value={place} onChange={(e)=>{setPlace(e.target.value)}} /><br/>
        <button onClick={handleEdituser}>Update</button>
        </div>
        
        </>
    )
}

export default Edituser;