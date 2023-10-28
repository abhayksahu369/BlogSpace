import { Link } from "react-router-dom";
import Card from "./homepage/Card"
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./homepage/Footer";


const MyProfile = () => {
    const [user, setUser] = useState({});
    const [blogs, setBlogs] = useState([]);
    const[dpnumber,setDpnumber]=useState("");
    const id=JSON.parse(localStorage.getItem("id")).id

    useEffect(() => {
        getUser()
        getBlogs()
    }, [])

    const getUser = async () => {
        try {
            const result = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/user/getauser/${id}`)
            setUser(result.data);
            setDpnumber(result.data.dpnumber)

        } catch (error) {
            console.log("error while getting a user.")
            console.error(error)
            alert("something went wrong please try again later.")
        }
    }
    const getBlogs = async () => {
        try {
            const result = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/blog/getuserblogs/${id}`)
            setBlogs(result.data);

        } catch (error) {
            console.log("error while getting a user.")
            console.error(error)
            alert("something went wrong please try again later.")
        }
    }


    return (
        <>
           <div className="myprofileContainer">
            <h1 className="mygalaxy">MY GALAXY</h1>
            <div className="myprofiletop">
                <img src={`https://raw.githubusercontent.com/abhayksahu369/images/main/astronauts/astronaut${dpnumber}.png`} alt=""></img>
                <div className="myprofiletopright" >
                    <h2>{user.username}</h2>
                    <p>{user.name}</p>
                    <p>{user.about}</p>
                    <p>{user.place}</p>
                    <Link to="/edituser">
                    <i class="ri-edit-box-fill ri-2x"></i>
                   </Link>
                </div>
            </div>
            <div className="myprofilebottom">

                {

                    blogs.length > 0?(
                        blogs.map((items) => (
                            <div className="myprofilecard">
                                <Card items={items} />
                                <Link to={`/updateblog/${items._id}`}>
                                    <i class="ri-edit-box-fill ri-2x"></i>
                                </Link>

                            </div>
                        ))):<h6>Ready to share your thoughts? Click <Link to="/createblog">Create Blog</Link> to get started on your blogging journey.  </h6>
                        
                    
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