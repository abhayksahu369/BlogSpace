import axios from "axios";
import { useState } from "react";
import Footer from "./homepage/Footer";
import ClipLoader from "react-spinners/ClipLoader"




const ReportAnIssue=()=>{
    const[issue,setIssue]=useState("")
    const [loading, setLoading] = useState(false)
    
   
    const token=JSON.parse((sessionStorage.getItem("token"))).token
    const user=JSON.parse((sessionStorage.getItem("id")))
    const authAxios =axios.create({
    baseURL:process.env.REACT_APP_API_ENDPOINT,
    headers:{
        Authorization:`Bearer ${token}`
    }
   })
    
    


    const handleReport=async()=>{
       try {

        if(!issue)return alert("all fields are necessary.")
        const createdat=new Date(Date.now());
        setLoading(true)
        const result=await authAxios.post(`${process.env.REACT_APP_API_ENDPOINT}/reportanissue`,{issue,createdat,userid:user.id,name:user.name})
        setLoading(false)
        alert("Your feedback has been received. We appreciate your help.")
        setIssue("")
       } catch (error) {
        setLoading(false)
         console.log("error while reporting an issue")
         console.error(error);
         alert("something went wrong,please try again.")
       }
    }
    return(
      <>
        <div className="createblog">
        <h1>Report An Issue</h1>
        <p>Help us enhance the platform by reporting any issues or suggesting improvements. Found a bug? Your feedback is valuable in addressing it.</p>
        <textarea className="blog" placeholder="Please write down the issue you are facing" value={issue}  onChange={(e)=>{setIssue(e.target.value)}}/><br/>
       {loading?<ClipLoader color="yellow" />:<button onClick={handleReport}>REPORT</button>}
         <br/><br/><br/><br/><br/>


        </div>
        <Footer/>
        </>
        
    )
}
export default ReportAnIssue;