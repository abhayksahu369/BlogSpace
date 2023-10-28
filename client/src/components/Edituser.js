import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Footer from "./homepage/Footer"
const Edituser=()=>{
    const[name,setName]=useState("")
    const[username,setUsername]=useState("")
    const[email,setEmail]=useState("")
    const[about,setAbout]=useState("")
    const[place,setPlace]=useState("")
    const[dpnumber,setDpnumber]=useState("");
    const navigate=useNavigate();
    const id=JSON.parse(localStorage.getItem("id")).id
    useEffect(()=>{
      getUser();
    },[])
    const getUser = async () => {
        try {
           
            const result = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/user/getauser/${id}`)
            setName(result.data.name)
            setUsername(result.data.username)
            setEmail(result.data.email)
            setAbout(result.data.about)
            setPlace(result.data.place)
            setDpnumber(result.data.dpnumber)
            
            } catch (error) {
            console.log("error while getting a user.")
            console.error(error)
            alert("something went wrong please try again later.")
        }
    }
    const handleEdituser=async()=>{
        try {
            if(!(name&&username&&email&&about&&place))return alert("all fields are necessary.")
            const result=await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/user/edituser/${id}`,{name,username,email,about,place,dpnumber})
            console.log("user edited")
            console.log(result.data)
            navigate("/myprofile")

        } catch (error) {
            console.log("error in editing a user")
            console.log(error);
            if(error.response.data.result)return alert(error.response.data.result)
            alert("something went wrong please try again later.")
            
        }

    }

    const handleDpchange=()=>{
        const dpnumber=Math.floor( Math.random()*19 + 1)
        setDpnumber(dpnumber)
    }
    return(
        <>
        <br/><br/><br/>
        <div className="editProfileContent" >
        <h1>Edit Profile</h1>
        <img src={`https://raw.githubusercontent.com/abhayksahu369/images/main/astronauts/astronaut${dpnumber}.png`} alt=""></img>
        <button style={{height:"15px",width:"50px",fontSize:"10px"}} onClick={handleDpchange}>CHANGE</button>
        <div className="editProfileForm">
        <p>Full Name</p>
        <input type="text" placeholder="Full Name" value={name} onChange={(e)=>{if (e.target.value.length < 21)setName(e.target.value)}} />
        <p>Username</p>
        <input type="text" placeholder="Username(up to 15 characters)" value={username} onChange={(e)=>{if (e.target.value.length < 15)setUsername(e.target.value)}} />
        <p>Email</p>
        <input type="text" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
        <p>About</p>
        <input type="text" placeholder="About(up to 5 words)" value={about} onChange={(e)=>{if (e.target.value.length < 30)setAbout(e.target.value)}} />
        <p>Place</p>
        <input type="text" placeholder="Place" value={place} onChange={(e)=>{if (e.target.value.length < 21)setPlace(e.target.value)}} /><br/>
        </div>
        <button onClick={handleEdituser}>Update</button>
        <br/><br/><br/><br/><br/>
        </div>
        <Footer/>
        </>
    )
}

export default Edituser;