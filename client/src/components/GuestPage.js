import React, { useEffect, useState } from "react";
import Card from "./homepage/Card";
import axios from "axios";
import planet from "./images/planet2.png"
import planet2 from "./images/planet.png"
import rocket from "./images/rocket.png"
import meteorite from "./images/meteorite.png"
import rocket2 from "./images/rocket2.png"


const GuestPage = () => {
    return (
        <>
            <div style={{ textAlign: "center" }}>
                <br /><br />
                <img src="https://raw.githubusercontent.com/abhayksahu369/images/main/spaceStickers/landingpageAstro.png" style={{ width: "200px" }} />
                {/* <img src="https://raw.githubusercontent.com/abhayksahu369/images/main/spaceStickers/creativity.png" style={{position:"absolute",width:"100px",zIndex:"-1"}}/>
            <img src="https://raw.githubusercontent.com/abhayksahu369/images/main/spaceStickers/rocket-ship.png" style={{position:"absolute",width:"100px",top:"100px",left:"0",zIndex:"-1"}}/> */}
                {/* <img src={meteorite} style={{position:"absolute",width:"50px",right:"0px",zIndex:"-1"}}/>
            <img src={rocket2} style={{position:"absolute",width:"50px",top:"100px",right:"0px",zIndex:"-1"}}/> */}
                <div className="homeblogsHeading" style={{ marginTop: "0" }}>
                    <h1 style={{ fontSize: "30px", color: "yellow" }}>Welcome TO</h1>
                    <h1 style={{ fontSize: "50px", color: "yellow" }}> BlogSpace!</h1>
                </div>

                <br />
                <p className="seatbelt" style={{ color: "aliceblue", fontSize: "15px", border: "none", padding: "0" }}>Your Cosmic Journey Begins</p>
                <br />
                <div className="seatbelt" style={{ border: "none", fontSize: "13px", color: "aliceblue" }}>
                    <p>Embark on an extraordinary cosmic journey at BlogSpace, where you can explore, learn, and share your thoughts on a wide range of topics. Each blog is a unique planet, waiting to be discovered. Whether you're passionate about space, science, or any subject, our cosmic community welcomes everyone. Knowledge knows no bounds here, and your curiosity is your guide.</p>

                </div>
                <br /><br /><br />
                <div className="seatbelt" style={{ border: "none", fontSize: "12px", color: "yellow" }}>
                    <p>Unleash your cosmic curiosity register or log in and let the adventure begin!"</p>

                </div>
                <div style={{display: "flex",justifyContent:"center", gap: "10px" }}>
                    <button className="button">LOGIN</button>
                    <button className="button">REGISTER</button>
                </div>
            </div>
            

        </>
    )
}

export default GuestPage;