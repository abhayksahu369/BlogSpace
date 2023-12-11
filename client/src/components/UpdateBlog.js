import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Footer from "./homepage/Footer"
import ClipLoader from "react-spinners/ClipLoader"
const EditBlog = () => {
    const [heading, setHeading] = useState("")
    const [blog, setBlog] = useState("")
    const [loading, setLoading] = useState(false)
    const [loadingBLog, setLoadingBlog] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()

    const token = JSON.parse((localStorage.getItem("token"))).token
    const authAxios = axios.create({
        baseURL: process.env.REACT_APP_API_ENDPOINT,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    useEffect(() => {
        getblog()
    }, [])

    const getblog = async () => {
        try {
            setLoadingBlog(true)
            const result = await authAxios.get(`${process.env.REACT_APP_API_ENDPOINT}/blog/getablog/${id}`)
            setLoadingBlog(false)
            if (!result.data.heading) return alert("something went wrong,please try again later.")
            setHeading(result.data.heading)
            setBlog(result.data.blog)
        } catch (error) {
            setLoadingBlog(false)
            console.log("error in getting a blog.")
            console.error(error)
            alert("something went wrong,please try again later.")
        }
    }


    const handleEditBlog = async () => {
        try {
            if (!(heading && blog)) return alert("all fields are necessary.")
            setLoading(true)
            const result = await authAxios.put(`${process.env.REACT_APP_API_ENDPOINT}/blog/editblog/${id}`, { heading, blog })
            setLoading(false)
            if (!result.data.heading) return alert("something went wrong,please try again later.")
            alert("Blog Updated.")
            back();

        } catch (error) {
            setLoading(false)
            console.log("error in editting a blog.")
            console.error(error)
            alert("something went wrong,please try again later.")
        }
    }
    const back = () => {
        window.history.back();
    }
    return (
        <>
            <div className="createblog">
                <h1> EDIT BLOG</h1>
                {loadingBLog ? <ClipLoader color="yellow" /> :
                    <>
                        <textarea className="heading" placeholder="Write a short 7-8 word heading for your blog (to be shown in the feed)." value={heading} onChange={(e) => { setHeading(e.target.value) }} /><br />
                        <textarea className="blog" placeholder="Share your thoughts, experiences, or stories here (short or long,any category)." value={blog} onChange={(e) => { setBlog(e.target.value) }} /><br />
                        {loading ? <ClipLoader color="yellow" /> : <button onClick={handleEditBlog} >EDIT</button>}

                    </>
                }

                <br /><br /><br /><br /><br />

            </div>
            <Footer />
        </>

    )
}
export default EditBlog;