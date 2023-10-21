import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const Login=()=>{
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const navigate=useNavigate()

    const handleLogin=async()=>{
       try {
        if(!(email&&password))return alert("all fields are necessary.")
         const result= await axios.post("http://localhost:5000/api/auth/login",{email:email,password:password},{withCredentials:true})
         if(result.data.name){
          localStorage.setItem("id",JSON.stringify({id:result.data._id}))
          console.log(result.data)
          navigate("/")
         }
         
       } catch (error) {
        console.log("error in login.")
        if(error.response.data.result)
        {
          alert(error.response.data.result)
        }else{
          alert("something went wrong, please try again later.")
        }
        
        console.log(error)
        
       }
    }
    return(
        <>
        <br/><br/><br/><br/>
        <input value={email} onChange={(e)=>{setEmail(e.target.value)}} ></input>
        <input value={password} onChange={(e)=>{setPassword(e.target.value)}} ></input>
        <button onClick={handleLogin}>login</button>
        </>
    )
}
export default Login;