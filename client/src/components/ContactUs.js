import axios from "axios";
import { useState } from "react";
import Footer from "./homepage/Footer";
import ClipLoader from "react-spinners/ClipLoader"




const ContactUs=()=>{
    const[message,setMessage]=useState("")
    const [loading, setLoading] = useState(false)
    
   
    const token=JSON.parse((localStorage.getItem("token"))).token
    const user=JSON.parse((localStorage.getItem("id")))
    const authAxios =axios.create({
    baseURL:process.env.REACT_APP_API_ENDPOINT,
    headers:{
        Authorization:`Bearer ${token}`
    }
   })
    
    


    const handleReport=async()=>{
       try {

        if(!message)return alert("all fields are necessary.")
        const createdat=new Date(Date.now());
        setLoading(true)
        await authAxios.post(`${process.env.REACT_APP_API_ENDPOINT}/contactus`,{message,createdat,userid:user.id,name:user.name})
        setLoading(false)
        alert("Your feedback has been received. It's valuable to us.")
        setMessage("")
       } catch (error) {
        setLoading(false)
         console.log("error while Contacting")
         console.error(error);
         alert("something went wrong,please try again.")
       }
    }
    return(
      <>
        <div className="createblog">
        <h1>Contact Us</h1>
        <p>We value your input and want to hear what's on your mind. Share your feedback, suggestions, and comments with us. Your feedback matters and drives improvements in our platform. </p>
        <textarea className="blog" placeholder="Please write down the message." value={message}  onChange={(e)=>{setMessage(e.target.value)}}/><br/>
       {loading?<ClipLoader color="yellow" />:<button onClick={handleReport}>SEND</button>}
         <br/><br/><br/><br/><br/>


        </div>
        <Footer/>
        </>
        
    )
}
export default ContactUs;