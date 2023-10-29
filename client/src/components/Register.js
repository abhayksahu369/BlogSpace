import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import ClipLoader from "react-spinners/ClipLoader"
import iconCount from "../config.js"


const Register=()=>{
    const auth=localStorage.getItem("id")
    const[name,setName]=useState("")
    const[username,setUsername]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[repassword,setRepassword]=useState("")
    const[about,setAbout]=useState("")
    const[place,setPlace]=useState("")
    const[loading,setLoading]=useState(false)
    const navigate=useNavigate()

    
  useEffect(()=>{
    if(auth){
     navigate("/")
    }
   },[])
    
    const handleRegister=async()=>{
       
        try {
            const dpnumber=Math.floor( Math.random()*iconCount.dpcount + 1)
            if(!(name&&username&&email&&password&&repassword&&about&&place))return alert("all fields are necessary.")
            if(password!==repassword)return alert("password and Retype password are not matching.")
            setLoading(true)
            const result=await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/auth/signup`,{name,username,email,password,about,place,dpnumber})
            setLoading(false)
            localStorage.setItem("id", JSON.stringify({ id: result.data._id,name:result.data.name }))
            console.log("user registered")
            console.log(result.data)
            navigate("/")
        } catch (error) {
            setLoading(false)
            console.log("error in registering")
            console.log(error);
            if(error.response.data.result)return alert(error.response.data.result)
            alert("something went wrong please try again later.")
            
        }

    }
    return(
        <>
        <br/><br/><br/>
        <div className="registerContent">
        <h1>Join Our Space Blogging Community</h1>
        <p>Create an astronaut profile and explore a universe of ideas with us.</p>
        <div className="registerForm">
        <input type="text" placeholder="Full Name" value={name} onChange={(e)=>{if (e.target.value.length < 30)setName(e.target.value)}} />
        
        <input type="text" placeholder="Username(up to 15 characters)" value={username} onChange={(e)=>{if (e.target.value.length < 14)setUsername(e.target.value)}} />
        
        <input type="text" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
        
        <input type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
    
        <input type="password" placeholder="Re-type Password" value={repassword} onChange={(e)=>{setRepassword(e.target.value)}} />
        
        <input type="text" placeholder="About(up to 5 words)" value={about} onChange={(e)=>{if (e.target.value.length < 30)setAbout(e.target.value)}} />
        
        <input type="text" placeholder="Place" value={place} onChange={(e)=>{if (e.target.value.length < 30)setPlace(e.target.value)}} /><br/>
        {loading?<ClipLoader color="yellow" />:<button onClick={handleRegister}>Register</button>}
        <p>Already a user? Please <Link to="/login">log in.</Link></p>
        </div>
        </div>
        
        </>
    )
}

export default Register;