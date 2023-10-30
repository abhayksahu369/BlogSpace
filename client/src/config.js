import axios from "axios"
const dpcount=19;
const planetCount=21;
const id=JSON.parse(localStorage.getItem("id")).id

const authAxios =axios.create({
    baseURL:process.env.REACT_APP_API_ENDPOINT,
    headers:{
        Authorization:`Bearer ${id}`
    }
})
export  {dpcount,planetCount,authAxios}