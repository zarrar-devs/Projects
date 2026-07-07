import { dataBase } from "../appwrite/config/config"
import { useEffect, useState } from "react"
import PostCard from "../components/PostCard/PostCard";
import { Link } from "react-router-dom";


function Home() {

    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const res = dataBase.listPosts()

        res.then(data => {
            if (data) {
                setPosts(data.rows)
            }
            else {
                setPosts([])
            }
        })
        res.catch(e => {
            console.log(e);
            setPosts(null)
        })
        res.finally(() => {
            setLoading(false)
        })
    }, [])

    if (loading) {
        return <div className="h-[50vh] bg-white flex justify-center items-center text-black text-3xl">Loading...</div>
    }

    if (posts == null) {
        return <div className="h-[50vh] bg-white text-black text-3xl flex items-center justify-center">
            Check your Internet or something is wrong!
        </div>
    }

    if (posts?.length === 0) {
        return <div className="h-[50vh] bg-white flex justify-center items-center flex-col gap-3">
            <p className="text-black text-4xl">No post has found!</p>
            <Link className=" flex justify-center items-center rounded-3xl w-[120px] p-3 bg-gray-600 hover:bg-black " to={'/add-post'}>CREATE <span>+</span></Link>
        </div>
    }

    if (posts) {
        return <div className="grid grid-cols-1 bg-white  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {posts.map((post) => {
                return (
                    <PostCard
                        key={post.$id}
                        {...post}
                    />
                )
            })}
        </div>
    }
}

export default Home