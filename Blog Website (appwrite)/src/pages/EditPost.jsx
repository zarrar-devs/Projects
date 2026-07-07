import { useNavigate, useParams } from "react-router-dom"
import { dataBase } from "../appwrite/config/config"
import { useEffect, useState } from "react"
import PostForm from "../components/PostForm/PostForm";
import { useSelector } from "react-redux";


function EditPost() {

    const [post, setPost] = useState(null);
    const navigate = useNavigate()
    const {slug} = useParams()

    useEffect(() => {
        if (slug) {
           const res = dataBase.getPostBySlug(slug);

           res.then((data=>{
            data ? setPost(data) : navigate('/')
           }))
        }
    }, [])




    return (
        post ? (
            <div>
                <PostForm post={post}></PostForm>
            </div>
        ) : null
    )
}

export default EditPost