import axios from 'axios'


const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
})

export const getPosts = ()=>{
    return api.get('/posts')
}

export const DeletePosts = (id)=>{
     return api.delete(`/posts/${id}`)
}

export const AddData = (newPost)=>{
     return api.post('/posts',newPost)
}

export const PatchData = (id,newPost)=>{
    return api.patch(`/posts/${id}`,newPost)
}