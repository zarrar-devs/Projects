import { useEffect, useState } from "react"
import { dataBase } from "../appwrite/config/config"
import { useNavigate, useParams, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import Logo from "../components/Logo/Logo"
import parse from "html-react-parser"


function Post() {

    const [post, setPost] = useState(null)
    const [image, setImage] = useState(null)
    const userInfo = useSelector(state => state.authReducer.userInfo)
    const isAuthor = post && userInfo ? post?.userID === userInfo.$id : false
    const navigate = useNavigate()
    const { slug } = useParams()
    const dateObj = new Date(post?.$createdAt)
    const [confirm, setConfirm] = useState(false)
    const [copied, setCopy] = useState(false)
    const [loading, setLoading] = useState(true)





    const date = dateObj.toLocaleDateString('en-PK', {
        dateStyle: 'medium'
    })

    const time = dateObj.toLocaleTimeString('en-PK', {
        timeStyle: 'short'
    })






    useEffect(() => {
        if (slug) {
            const res = dataBase.getPostBySlug(slug)
            res.then(data => {
                if (data) {
                    setPost(data)
                }
            })
            res.finally(() => {
                setLoading(false)
            })


        }
    }, [slug])

    useEffect(() => {
        if (post?.featuredIMG) {
            dataBase.getFilePreview(post?.featuredIMG).then(file => {
                setImage(file)
            })
        }
    }, [post])


    // console.log(post?.featuredIMG,'futureee');




    async function deletePost() {
        const res = await dataBase.deletePost(post.$id)

        if (res) {
            if (post?.featuredIMG) {
                const delFile = await dataBase.deleteFile(post.featuredIMG)

                delFile ? navigate('/home') : null
            }
        }

    }

    const confirmDelete = () => {
        setConfirm(true)
    }

    const handleCancel = () => {
        setConfirm(false)
    }

    const handleCopyLink = () => {
        const url = window.location.href;

        navigator.clipboard.writeText(url)
            .then(() => {
                setCopy(true)
                setTimeout(() => {
                    setCopy(false)
                }, 3000);
            })
    }


    const handleEditPost = () => {
        navigate(`/edit-post/${post.slug}`)
    }


    if (loading) {
        return <div className="w-full flex items-center justify-center h-[100vh] bg-white text-black text-2xl">
            LOADING...
        </div>
    }

    if (!post) {
        return <div className="flex justify-center items-center flex-col text-4xl h-[100vh]">
            <h1>THE POST IS PRIVATE OR SOMETHING WENT WRONG!</h1>
            <br />     <Link className="bg-black p-4 rounded-2xl" to={'/home'} >BACK TO HOME</Link>
        </div>
    }

    if (post) {
        return (
            <div className="w-[100vw] flex flex-col justify-center items-center bg-white text-black p-4">

                <div className={`flex flex-col gap-4 justify-center items-center rounded-3xl absolute z-50 top-[40%] bg-[#1d1d21] p-12 scale-0 opacity-0 transition-all  ${confirm && 'scale-100 opacity-100'} `}>
                    <div>
                        <p className="text-white">Are you sure you want to delete this</p>
                    </div>
                    <div className="flex gap-2 justify-end w-[100%]">
                        <button onClick={handleCancel} className="p-2 text-white cursor-pointer">Cancel</button>
                        <button onClick={() => {
                            setConfirm(false)
                            deletePost()
                        }}
                            className="bg-red-700 p-1 w-[120px] rounded text-white cursor-pointer">Confirm</button>
                    </div>
                </div>

                <div className="border-b-2 mb-5 font-black">
                    <Logo width="120px"></Logo>
                </div>

                <div className="flex items-center gap-2 ">
                    <div className="mb-4 relative">
                        <h2 className="text-4xl font-extrabold" >{post?.title}</h2>

                        <div className="absolute z-[100] top-[-100%]  ">
                            {isAuthor && (
                                <div className="flex gap-6 p-3 justify-center items-center border-1 border-gray-400">
                                    <div className="flex justify-center items-center">
                                        <button onClick={handleEditPost}><img className="w-[22px] cursor-pointer hover:scale-[0.8] transition-all" src="/images/edit.png" alt="EDIT" /></button>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <button onClick={confirmDelete}><img className="w-[20px] cursor-pointer hover:scale-[0.8] transition-all" src="/images/delete.png" alt="DELETE" /></button>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <button onClick={handleCopyLink}>{copied ? 'COPIED' : <img className="w-[20px] cursor-pointer hover:scale-[0.8] transition-all" src="/images/copy-link.png" alt="COPY-LINK" />}</button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-start shrink-0 ">
                        <p>{`${date}, `} <br /> <span className="text-red-500">{time}</span></p>
                    </div>

                    <div className="aspect-video w-[80%] mt-4 mr-5 self-center">
                        <img className="w-full" src={image || '/images/no-image.png'} />
                    </div>

                </div>
                <div className="w-[100%] max-w-3xl mt-6 p-8 rounded-3xl bg-[#f7f7f7] text-gray-500">
                    <div className=" relative">
                       {isAuthor && <button onClick={handleEditPost} className="cursor-pointer absolute z-50 right-[-10%]"><img className="w-[24px]" src="/images/edit-text.png" alt="EDIT" /></button>}
                        {parse(post?.content || "")}
                    </div>
                </div>
            </div>
        )
    }
}


export default Post