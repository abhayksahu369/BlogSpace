import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"


const Login = () => {
  const auth=localStorage.getItem("id")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  useEffect(()=>{
   if(auth){
    navigate("/")
   }
  },[])
  const handleLogin = async () => {
    try {
      if (!(email && password)) return alert("all fields are necessary.")
      const result = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/auth/login`, { email: email, password: password }, { withCredentials: true })
      if (result.data.name) {
        localStorage.setItem("id", JSON.stringify({ id: result.data._id,name:result.data.name }))
        console.log(result.data)
        navigate("/")
      }

    } catch (error) {
      console.log("error in login.")
      if (error.response.data.result) {
        alert(error.response.data.result)
      } else {
        alert("something went wrong, please try again later.")
      }

      console.log(error)

    }
  }
  return (
    <>
      <br /><br /><br />
      <div className="registerContent">
        <h1>Reconnect with Your Cosmic Journey</h1>
        <p>Welcome back, Astronaut! Enter your credentials to continue your interstellar exploration. </p>
        <div className="registerForm">

          <input type="text" value={email} placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} ></input>
          <input type="password" value={password} placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} ></input>
          <button onClick={handleLogin}>login</button>
          <p>Don't have an account yet? <Link to="/register">Register here.</Link></p>
        </div>
      </div>
    </>
  )
}
export default Login;