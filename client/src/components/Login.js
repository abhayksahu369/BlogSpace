import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import ClipLoader from "react-spinners/ClipLoader"


const Login = () => {
  const auth=localStorage.getItem("token")
  const [email, setEmail] = useState("guest@gmail.com")
  const [password, setPassword] = useState("guest")
  const[loading,setLoading]=useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
   if(auth){
    navigate("/")
   }
  },[])
  const handleLogin = async () => {
    try {
      if (!(email && password)) return alert("all fields are necessary.")
      setLoading(true)
      const result = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/auth/login`, { email: email, password: password }, { withCredentials: true })
      setLoading(false)
      if (result.data.user.name) {
        localStorage.setItem("id", JSON.stringify({ id: result.data.user._id,name:result.data.user.name }))
        localStorage.setItem("token", JSON.stringify({ token:result.data.auth}))
        navigate("/")
      }

    } catch (error) {
      console.log("error in login.")
      setLoading(false)
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
          {loading?<ClipLoader color="yellow" />:<button onClick={handleLogin}>login</button>}
          <p>Don't have an account yet? <Link to="/register">Register here.</Link></p>
        </div>
      </div>
      <br/><br/><br/>
      <div style={{color:"aliceblue",fontSize:"10px",position:"absolute",bottom:"10px",left:"50%",transform:"translate(-50%,0)",textAlign:"center"}}>
                <Link style={{color:"aliceblue"}} to="/about"> About </Link><p>© 2023 BlogSpace. All rights reserved. </p>
        </div>
    </>
  )
}
export default Login;
