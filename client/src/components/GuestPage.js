import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


const GuestPage = () => {
    const auth = localStorage.getItem("token")
    const navigate = useNavigate()
    useEffect(() => {
        if (auth) {
            navigate("/")
        }
    }, [])
    return (
        <>
            <div style={{ textAlign: "center", position: "relative" }}>
                <br /><br />
                <img src="https://raw.githubusercontent.com/abhayksahu369/images/main/spaceStickers/landingpageAstro.png" style={{ width: "200px", zIndex: "-1" }} />
                {/* <img src="https://raw.githubusercontent.com/abhayksahu369/images/main/spaceStickers/creativity.png" style={{position:"absolute",width:"100px",zIndex:"-1"}}/>
            <img src="https://raw.githubusercontent.com/abhayksahu369/images/main/spaceStickers/rocket-ship.png" style={{position:"absolute",width:"100px",top:"100px",left:"0",zIndex:"-1"}}/> */}
                {/* <img src={meteorite} style={{position:"absolute",width:"50px",right:"0px",zIndex:"-1"}}/>
            <img src={rocket2} style={{position:"absolute",width:"50px",top:"100px",right:"0px",zIndex:"-1"}}/> */}
                <div className="homeblogsHeading" style={{ marginTop: "0" }}>
                    <h1 style={{ fontSize: "30px", color: "yellow" }}>Welcome TO</h1>
                    <h1 style={{ fontSize: "50px", color: "yellow" }}> BlogSpace!</h1>
                </div>
                <p className="seatbelt" style={{ color: "yellow", fontSize: "15px", border: "none", padding: "0" }}>Your Cosmic Journey Begins</p>
                <br />
                <div className="seatbelt" style={{ border: "none", fontSize: "13px", color: "aliceblue" }}>
                    <p>Embark on an extraordinary cosmic journey at BlogSpace, where you can explore, learn, and share your thoughts on a wide range of topics. Each blog is a unique planet, waiting to be discovered. Whether you're passionate about space, science, or any subject, our cosmic community welcomes everyone. Knowledge knows no bounds here, and your curiosity is your guide.</p>

                </div>
                <br />
                <div className="seatbelt" style={{ border: "none", fontSize: "12px", color: "yellow" }}>
                    <p>Unleash your cosmic curiosity register or log in and let the adventure begin!"</p>

                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                    <Link to="/login"><button className="button">LOGIN</button></Link>
                    <Link to="/register"><button className="button">REGISTER</button></Link>
                </div>
                <br /><br /><br />
                <div style={{ color: "aliceblue", fontSize: "10px", position: "absolute", bottom: "10px", left: "50%", transform: "translate(-50%,0)", textAlign: "center" }}>
                    <Link style={{ color: "aliceblue" }} to="/about"> About </Link><p>© 2025 BlogSpace. All rights reserved. </p>
                </div>
            </div>


        </>
    )
}

export default GuestPage;
