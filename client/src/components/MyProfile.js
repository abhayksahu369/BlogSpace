import { Link } from "react-router-dom";
import Card from "./homepage/Card"
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./homepage/Footer";
import ClipLoader from "react-spinners/ClipLoader"


const MyProfile = () => {
    const [user, setUser] = useState({});
    const [blogs, setBlogs] = useState([]);
    const[dpnumber,setDpnumber]=useState(0);
    const[loadinguser,setLoadinguser]=useState(false)
    const[loadingblog,setLoadingblog]=useState(false)
    const id=JSON.parse(localStorage.getItem("id")).id

    useEffect(() => {
        getUser()
        getBlogs()
    }, [])

    const getUser = async () => {
        try {
            setLoadinguser(true)
            const result = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/user/getauser/${id}`)
            setLoadinguser(false)
            setUser(result.data);
            setDpnumber(result.data.dpnumber)

        } catch (error) {
            setLoadinguser(false)
            console.log("error while getting a user.")
            console.error(error)
            alert("something went wrong please try again later.")
        }
    }
    const getBlogs = async () => {
        try {
            setLoadingblog(true)
            const result = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/blog/getuserblogs/${id}`)
            setLoadingblog(false)
            setBlogs(result.data);

        } catch (error) {
            setLoadingblog(false)
            console.log("error while getting a user.")
            console.error(error)
            alert("something went wrong please try again later.")
        }
    }


    return (
        <>
         
           <div className="myprofileContainer">
           <h1 className="mygalaxy">MY GALAXY</h1>
           {
           loadinguser?<><div style={{textAlign:"center"}}><ClipLoader color="yellow"  /></div></>:
           (
            <>
            <div className="myprofiletop">
                <img src={`https://raw.githubusercontent.com/abhayksahu369/images/main/astronauts/astronaut${dpnumber}.png`} alt=""></img>
                <div className="myprofiletopright" >
                    <h2>{user.username}</h2>
                    <p>{user.name}</p>
                    <p>{user.about}</p>
                    <p>{user.place}</p>
                    <Link to="/edituser">
                    <i className="ri-edit-box-fill ri-2x"></i>
                   </Link>
                </div>
            </div>
            </>
            )
           }
            <div className="myprofilebottom">
            {loadingblog?<p style={{color:"aliceblue",fontSize:"10px"}}>Loading Blogs...</p>:<></>}

                {

                    blogs.length > 0?(
                        blogs.map((items) => (
                            <div className="myprofilecard" key={items._id}>
                                <Card items={items}  />
                                <Link to={`/updateblog/${items._id}`}>
                                    <i className="ri-edit-box-fill ri-2x"></i>
                                </Link>

                            </div>
                        ))):<>{loadingblog?<></>:<h6>Ready to share your thoughts? Click <Link to="/createblog">Create Blog</Link> to get started on your blogging journey.  </h6>}</>
                        
                    
            }
            {
               blogs.length > 0? <h6>You've reached the end of your blog. <Link to="/createblog">Launch More Blog</Link></h6>:<></>
            }
            
            <br/><br/><br/><br/>
              
            </div>
            </div>
            <Footer/>
        </>
    )
}
export default MyProfile