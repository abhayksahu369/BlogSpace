import axios from "axios"
const dpcount=19;
const planetCount=21;
const token=JSON.parse(localStorage.getItem("token"))


const authAxios =axios.create({
    baseURL:process.env.REACT_APP_API_ENDPOINT,
    headers:{
        Authorization:`Bearer ${token.token}`
    }
})
export  {dpcount,planetCount,authAxios}