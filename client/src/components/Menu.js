import { Link, useNavigate } from "react-router-dom";


const Menu = () => {
    const navigate = useNavigate();
    const auth=localStorage.getItem("id")
    const handleLogout = () => {
            const logout=window.confirm("Are you sure you want to log out?")
            if(logout){
                navigate("/login")
                localStorage.removeItem("id");
                localStorage.removeItem("token");
                sessionStorage.removeItem("next")
            }
           
        
    }
    const back = () => {
        window.history.back()
    }
    return (
        <>
            <div className="menu">
                {
                    auth?(
                        <>
                <Link to="/"><div className="menulist">HOME</div></Link>
                <Link to="/myprofile"><div className="menulist">MY PROFILE</div></Link>
                <Link to="/edituser"><div className="menulist">EDIT PROFILE</div></Link>
                <Link to="/createblog"><div className="menulist">CREATE A BLOG</div></Link>
                <div className="menulist" onClick={handleLogout}>LOGOUT</div>
                <div className="menulist" onClick={back}>BACK</div>
                </>
                    ):(
                        <>
                         <Link to="/login"><div className="menulist">LOGIN</div></Link>
                         <Link to="/register"><div className="menulist">REGISTER</div></Link>
                         <div className="menulist" onClick={back}>BACK</div>
                        </>
                    )

                }
                

            </div>
            <br /><br /><br /><br />

        </>
    )
}
export default Menu;