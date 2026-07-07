import { useState,useEffect } from "react"
import { getPosts } from "../api/postAPI"
import { DeletePosts } from "../api/postAPI"

function Posts({data,setData,setEditable,editable}) {

  
 


     async function handleDelete(id){
        await DeletePosts(id)
        setData(preData=> preData.filter((data)=>{
          return data.id !== id
        }))
         
    }

    function handleEdit(post){
        setEditable(post)
    }


    return (
         <div className="posts">
        {
          data.map(post => {
            return <div key={post.id} className="post">
              <div className="section">

                <h3 className="title">{post.title}</h3>
                <p className="body">{post.body}</p>

                <button onClick={()=> handleEdit(post)} >EDIT</button>
                <button onClick={()=>handleDelete(post.id)}>DELETE</button>

              </div>
            </div>
          })
        }
      </div>
    )
}

export default Posts