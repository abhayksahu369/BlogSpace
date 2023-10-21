import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"



const Register=()=>{
    const[name,setName]=useState("")
    const[username,setUsername]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[repassword,setRepassword]=useState("")
    const[about,setAbout]=useState("")
    const[place,setPlace]=useState("")
    const handleRegister=async()=>{
        try {
            const result=await axios.post("http://localhost:5000/api/auth/signup",{name,username,email,password,about,place})
            console.log("user registered")
            console.log(result.data)
        } catch (error) {
            console.log("error in registering")
            console.log(error);
            if(error.response.data.result)return alert(error.response.data.result)
            alert("something went wrong please try again later.")
            
        }

    }
    return(
        <>
        <br/><br/><br/>
        <div style={{color:" #C0C0C0"}}>
        <h2>Join Our Space Blogging Community</h2>
        <p>Create an astronaut profile and explore a universe of ideas with us.</p>
        <p>Full Name</p>
        <input type="text" placeholder="Full Name" value={name} onChange={(e)=>{setName(e.target.value)}} />
        <p>Username</p>
        <input type="text" placeholder="Username" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
        <p>Email</p>
        <input type="text" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
        <p>Password</p>
        <input type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
        <p>Re-type Password</p>
        <input type="password" placeholder="Re-type Password" value={repassword} onChange={(e)=>{setRepassword(e.target.value)}} />
        <p>About</p>
        <input type="text" placeholder="About" value={about} onChange={(e)=>{setAbout(e.target.value)}} />
        <p>Place</p>
        <input type="text" placeholder="Place" value={place} onChange={(e)=>{setPlace(e.target.value)}} /><br/>
        <button onClick={handleRegister}>Register</button>
        <p>Already a user? Please <Link to="/login">log in.</Link></p>
        </div>
        
        </>
    )
}

export default Register;