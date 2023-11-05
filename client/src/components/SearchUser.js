import axios from "axios";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader"
import Footer from "./homepage/Footer";
import { Link } from "react-router-dom";

const SearchUser = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    
    const [lastpage, setLastpage] = useState(false)
    const [key, setKey] = useState("")
    const [search, setSearch] = useState(false)
    const [next, setNext] = useState(1)
    const token = JSON.parse((sessionStorage.getItem("token"))).token
    const authAxios = axios.create({
        baseURL: process.env.REACT_APP_API_ENDPOINT,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    useEffect(() => {
        getusers()
    }, [next])

    const getusers = async () => {
        
        try {
            setLoading(true)
            const result = await authAxios.get(`${process.env.REACT_APP_API_ENDPOINT}/user/getallusers?page=${next}&size=8`)
            if (result.data.result) {
                setLastpage(true)
                setUsers([...result.data.user])
                setLoading(false)
            } else {
                setUsers([...result.data])
                setLoading(false)
            }


            // console.log(result.data)
        } catch (error) {
            setLoading(false)
            console.log("error while getting all users.")
            console.error(error)
            alert("something went wrong please try again later.")
        }
    }

    const handleSearch = async () => {
        if(!key)return alert("please enter key")
        setSearch(true)
        if (key) {
            try {
                console.log(key)
                setLoading(true)
                const result = await authAxios.get(`${process.env.REACT_APP_API_ENDPOINT}/user/searchusers/${key}`)
                setLoading(false)
                setUsers(result.data)
                console.log(result.data)
            } catch (error) {
                setLoading(false)
                console.log("error while searching users.")
                console.error(error)
                alert("something went wrong please try again later.")
            }
        }

    }
    const handleBack=()=>{
        setSearch(false)
        getusers()
    }
    return (
        <>
            <div className="searchInput">
                <input type="text" placeholder="Search Astronaut" onChange={(e) => { setKey(e.target.value) }} />
                <button className="button" onClick={handleSearch}>Search</button>
            </div>


            {search?<></>:
            <>
             <h1 className="astronautFamily">Astronaut Family</h1>
             <p className="astronautFamily" style={{ color: "aliceblue", fontSize: "10px" }}>New Arrivals in Our Astronaut Family</p>
            </>
            }
           
            <div className="usersList">
                {
                    users.length > 0 ?
                        <>
                            {
                                users.map((items) =>
                                    <Link to={`/userprofile/${items._id}`} key={items._id} >
                                        <div className="userContent" style={{ color: "yellow" }} >
                                            <img src={`https://raw.githubusercontent.com/abhayksahu369/images/main/astronauts/astronaut${items.dpnumber}.png`} alt="" />
                                            <div className="usercontentRight">
                                                <h5>{items.username}</h5>
                                                <p>{items.name}</p>
                                            </div>
                                        </div>
                                    </Link>
                                )

                            }

                        </> : <>{loading ? <></> : <h4 style={{ color: "yellow", fontSize: "10px", textAlign: "center" }}>No Astronaut Found.</h4>}</>

                }
                <div style={{ textAlign: "center" }}>
                {
                loading?<ClipLoader color="yellow" /> :
                <></>
                }
                    {
                        search ?
                        <>
                        {
                            loading ? <></> :
                         <button className="button" onClick={handleBack} >Back</button> 
                        }
                        </>:
                        <>{
                                lastpage ? <h4 style={{ color: "yellow", fontSize: "10px" }}>You've Reached the End of Our Astronaut Family.</h4> :
                                    <>
                                        {
                                            loading ? <></> :
                                                <p style={{ color: "yellow" }} onClick={() => setNext(next + 1)}>Load More Astronauts</p>
                                        }

                                    </>
                            }
                            </>
                    }
                </div>
            </div>




            <br /><br /><br /><br />


            <Footer />
        </>
    )
}
export default SearchUser;