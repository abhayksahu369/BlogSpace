import { Link } from "react-router-dom";

const Menu=()=>{
    const back=()=>{
        window.history.back()
    }
    return(
        <>
        <div className="menu">
            <Link to="/"><div className="menulist">HOME</div></Link>
            <Link to="/myprofile"><div className="menulist">MY PROFILE</div></Link>
            <Link to="/edituser"><div className="menulist">EDIT PROFILE</div></Link>
            <Link to="/createblog"><div className="menulist">CREATE A BLOG</div></Link>
            <Link to=""><div className="menulist">LOGOUT</div></Link>
            <div className="menulist" onClick={back}>BACK</div>
        </div>

        </>
    )
}
export default Menu;