import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Card = (props) => {
    const { heading, _id, userid,planetno,createdat } = props.items;
    const [user, setUser] = useState({})
    const[dpnumber,setDpnumber]=useState("");
    const[date,setDate]=useState("")
    const id=JSON.parse(localStorage.getItem("id")).id
     
    //  console.log(new Date("Sun Oct 22 2023 23:44:46 GMT+0530 (India Standard Time)"))
    //  console.log(new Date())
    //  console.log(`date is ${(new Date()-new Date("Sun Oct 22 2023 23:44:46 GMT+0530 (India Standard Time)"))}`)
    useEffect(() => {
        getTime()
        ;(async () => {
            try {
                const result = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/user/getauser/${userid}`)
                setUser(result.data)
                setDpnumber(result.data.dpnumber)

            } catch (error) {
                console.log("error getting user in home page")
                console.error(error)
                alert("something went wrong,please try again later.")
            }
        })()
    }, [])
    const getTime=()=>{
        const minute=1000*60;
        const hour=minute*60;
        const day=hour*24;
        const postedAgo = new Date(Date.now())-new Date(createdat)
        if(postedAgo<minute){
            const date="just now";
            setDate(date)
        }else if(postedAgo<hour){
            if(Math.floor(postedAgo/minute)<2){
               setDate(`${Math.floor(postedAgo/minute)} minute ago`) 
            }else{
               setDate(`${Math.floor(postedAgo/minute)} minutes ago`)
            }
        }else if(postedAgo<day){
            if(Math.floor(postedAgo/hour)<2){
              setDate(`${Math.floor(postedAgo/hour)} hour ago` )
            }else{
               setDate(`${Math.floor(postedAgo/hour)} hours ago`)
            }   
        }else{
            if(Math.floor(postedAgo/day)<2){
                setDate(`${Math.floor(postedAgo/day)} day ago`) 
            }else{
                setDate(`${Math.floor(postedAgo/day)} days ago`)
            }
        }


    }

    return (

        <>
            <div className="card">
                <div className="cardTop">
                    <div className="cardTopLeft">
                      {
                        id===userid?(
                            <>
                            <Link to={`/myprofile`}> <div className="profilePhoto"><img src={`https://raw.githubusercontent.com/abhayksahu369/images/main/astronauts/astronaut${dpnumber}.png`} alt="profile" /></div></Link>
                            <Link to={`/myprofile`}><div className="cardUsername">{user.username}</div></Link>
                            </>
                        ):(
                            <>
                            <Link to={`/userprofile/${user._id}`}> <div className="profilePhoto"><img src={`https://raw.githubusercontent.com/abhayksahu369/images/main/astronauts/astronaut${dpnumber}.png`} alt="profile" /></div></Link>
                            <Link to={`/userprofile/${user._id}`}><div className="cardUsername">{user.username}</div></Link>
                        </>
                        )

                      }
                        
                    </div>
                    <img src={`https://raw.githubusercontent.com/abhayksahu369/images/main/planets/planet${planetno}.png`} alt="planet" />

                </div>
                <Link to={`/blog/${_id}/${userid}`}>
                <div className="cardBottom">
                    <h1>{heading}</h1>
                </div>
                </Link>
                <p className="postedAgo">{date}</p>
                <Link to={`/blog/${_id}/${userid}`}>
                <p className="explore">Explore...</p>
                </Link>

            </div>

        </>
    )
}
export default Card;