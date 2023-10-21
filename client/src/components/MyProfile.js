import { Link } from "react-router-dom";
import Card from "./homepage/Card"
import profile from "./images/astro.png"
import { useEffect, useState } from "react";
import axios from "axios";


const MyProfile = () => {
    const [user, setUser] = useState({});
    const [blogs, setBlogs] = useState([]);
    const id=JSON.parse(localStorage.getItem("id")).id

    useEffect(() => {
        getUser()
        getBlogs()
    }, [])

    const getUser = async () => {
        try {
            const result = await axios.get(`http://localhost:5000/api/user/getauser/${id}`)
            setUser(result.data);

        } catch (error) {
            console.log("error while getting a user.")
            console.error(error)
            alert("something went wrong please try again later.")
        }
    }
    const getBlogs = async () => {
        try {
            const result = await axios.get(`http://localhost:5000/api/blog/getuserblogs/${id}`)
            setBlogs(result.data);

        } catch (error) {
            console.log("error while getting a user.")
            console.error(error)
            alert("something went wrong please try again later.")
        }
    }


    return (
        <>
            <h1 className="mygalaxy">MY GALAXY</h1>
            <div className="myprofiletop">
                <img src={profile} alt=""></img>
                <div className="myprofiletopright" >
                    <h4>{user.username}</h4>
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
                        ))):<h4>Oops you haven't written any blog. <Link to="/createblog">Create blog</Link></h4>
                        
                    
            }


            </div>
        </>
    )
}
export default MyProfile