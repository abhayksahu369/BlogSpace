import Cookies from "js-cookie";


const getId=()=>{
    const token=Cookies.get("token")
    console.log(token)
}

export default getId;