import { useEffect, useState } from "react"
import { dataBase } from "../appwrite/config/config"
import PostCard from "../components/PostCard/PostCard"
import { Link } from "react-router-dom"

function ListPosts() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    dataBase.listPosts()
      .then((data) => {
        if (data) {
          setPosts(data.rows)

        }
      })
  }, [])


 
  

  if(posts?.length === 0){
    return <div className="w-full h-[50vh] bg-white text-black flex items-center justify-center gap-2 flex-col">
        <p className="text-2xl">No post has found!</p>
        <Link to={'/add-post'} className="p-2 w-[120px] flex justify-center items-center bg-black text-white rounded-3xl cursor-pointer">CREATE</Link>
    </div>
  }

  return (
    <div className="flex justify-center items-center bg-white p-5 gap-6 flex-wrap">
      {posts.map(post => {
        return <PostCard date={post.$createdAt}  key={post.$id} slug={post.slug} title={post.title} featuredIMG={post.featuredIMG}>
               
        </PostCard>
      })}
    </div>
  )
}

export default ListPosts