import { useNavigate } from "react-router-dom"
import { dataBase } from "../../appwrite/config/config"
import { useEffect, useState } from "react";

function PostCard({ slug, title, featuredIMG,date }) {

  let navigate = useNavigate()
  const [image, setImage] = useState(null)
  const dateFormat = date ? new Date(date).toLocaleDateString('en-US',{
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }) : null

  useEffect(() => {
    dataBase.getFilePreview(featuredIMG).then(file => {
      setImage(file)
    })
  }, [])

  function handleNavigate() {
    console.log(slug, 'slug saar');

    navigate(`/post/${slug}`)
  }

  return (
    <div
      onClick={handleNavigate}
      className="cursor-pointer  bg-[#fdf2e3] rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
    >

      <div className="w-full h-48 bg-gray-200 relative group">
        {
          dateFormat &&(
            <div className="text-black p-2 bg-white  absolute opacity-0 group-hover:opacity-100 transition-all">
              {dateFormat}
            </div>
          )
        }

        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-3">
        <h2 className="text-base  text-black">
          {title}
        </h2>
      </div>

    </div >
  )
}

export default PostCard