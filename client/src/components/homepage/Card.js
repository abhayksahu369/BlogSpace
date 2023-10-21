import React, { useEffect, useState } from "react";
import astro from "../images/astro2.png"
import planet from "../images/planet.png"
import axios from "axios";
import { Link } from "react-router-dom";

const Card = (props) => {
    const { heading, _id, userid } = props.items;
    const [user, setUser] = useState({})
    useEffect(() => {
        (async () => {
            try {
                const result = await axios.get(`http://localhost:5000/api/user/getauser/${userid}`)
                setUser(result.data)

            } catch (error) {
                console.log("error getting user in home page")
                console.error(error)
                alert("something went wrong,please try again later.")
            }
        })()
    }, [])

    return (

        <>
            <div className="card">
                <div className="cardTop">
                    <div className="cardTopLeft">

                        <Link to={`/userprofile/${user._id}`}> <div className="profilePhoto"><img src={astro} alt="profile" /></div></Link>
                        <Link to={`/userprofile/${user._id}`}><div className="cardUsername">{user.username}</div></Link>
                    </div>
                    <img src={planet} alt="planet" />

                </div>
                <Link to={`/blog/${_id}/${userid}`}>
                <div className="cardBottom">
                    <h1>{heading}</h1>
                </div>
                </Link>
                <p className="postedAgo">2 hours ago</p>
                <p className="explore">Explore...</p>

            </div>

        </>
    )
}
export default Card;