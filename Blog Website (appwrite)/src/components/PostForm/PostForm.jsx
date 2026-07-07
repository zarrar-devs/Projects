import RTE from "../RTE/RTE"
import { useForm } from "react-hook-form"
import Input from "../Input/Input"
import { dataBase } from "../../appwrite/config/config"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useCallback, useEffect, useState } from "react"
import { nanoid } from "nanoid"
import Select from "../Select/Select"
import Logo from "../Logo/Logo"



function PostForm({ post }) {

  const selectData = [
    { name: 'PUBLIC', value: true, id: '5u89u8g' },
    { name: 'PRIVATE', value: false, id: 'hu54y75' },
  ]

  const { register, control, watch, setValue, handleSubmit, getValues, formState: { errors } } = useForm({
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
      slug: post?.slug || '',
      status: post?.status ?? 'true',
    }
  })

  const navigate = useNavigate()
  const userInfo = useSelector(state => state.authReducer.userInfo)
  const id = nanoid()
  const [previewImage, setPreviewImage] = useState(null)
  const [inputImage, setInputImage] = useState(null)
  const [loading, setLoading] = useState(false)


  const handleForm = async (data) => {

    if (loading) return
    setLoading(true)

    data.status = data.status === 'true'

    if (post) {

      if (data.featuredIMG[0]) {
        const file = await dataBase.uploadFile(data.featuredIMG[0])
        if (file) {
          const deleteFile = dataBase.deleteFile(post.featuredIMG);
        }
        const dbPost = await dataBase.updatePost({ ...data, rowId: post.$id, featuredIMG: file.$id ? file.$id : post.featuredIMG })
        if (dbPost) {
          navigate(`/post/${dbPost.slug}`)
        }
      }
      else {
        console.log('else is runing');

        const dbPost = await dataBase.updatePost({ ...data, rowId: post.$id, featuredIMG: post.featuredIMG })
        if (dbPost) {
          navigate(`/post/${dbPost.slug}`)
        }
      }


    }
    else if (!post) {
      const file = data.featuredIMG[0] ? await dataBase.uploadFile(data.featuredIMG[0]) : null


      if (file) {

        const createPost = await dataBase.createPost({
          ...data, userID: userInfo.$id, featuredIMG: file.$id,
        })

        if (createPost) {
          navigate(`/post/${createPost.slug}`)
        }
      }
    }
  }

  const slugTransform = useCallback(value => {
    if (value && typeof (value) === 'string') {
      return value.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        + nanoid(6)
    }
    else {
      return ''
    }
  }, [])


  const title = watch('title')

  useEffect(() => {
    setValue('slug', slugTransform(title))
  }, [title])

  useEffect(() => {
    if (post) {
      dataBase.getFilePreview(post?.featuredIMG)
        .then(file => {
          setPreviewImage(file)
        })
    }
  }, [post])

  function handleInputImage(e) {
    const file = e.target.files[0];

    if (file) {
      const prevUrl = URL.createObjectURL(file);
      setInputImage(prevUrl)
    }

  }

  const handleFileValidation = (file) => {
    if (!file || file.length === 0) return
    const image = file[0]
    const allowedTypes = ['image/png', 'image/jpeg', 'image/svg+xml']

    return allowedTypes.includes(image.type) || 'Only png, jpg, svg are allowed.'
  }



  return (
    <div className="flex justify-center items-center p-12 text-black bg-white w-full ">
      <form className="bg-[#f5f5f5] w-[80%] flex flex-col justify-center items-center" onSubmit={handleSubmit(handleForm)}>

        <div className="flex flex-col justify-center items-center">
          <Logo></Logo>
          <h2 className="font-bold text-4xl">{post ? 'EDIT YOUR BLOG.' : 'CREATE YOUR BLOG.'}</h2>
        </div>

        <Input className="border-b-2 m-3 w-[90%] focus:outline-0 p-1 text-xl" placeholder="Add a title" {...register('title', {
          required: 'Please Enter a Title.',
        })} ></Input>

        {
          errors.title && (
            <p className="text-red-600 p-2">{errors.title.message}</p>
          )
        }




        <RTE name={'content'} className='bg-red w-[90%] m-3' label={'Post Content'} defaultValue={getValues('content')} control={control}></RTE>

        <div className="flex flex-col gap-3 w-[50%] m-3">
          <label className="text-sm font-semibold text-gray-700">
            Upload Image
          </label>

          <input
            accept="image/png, image/jpeg, image/svg+xml"
            type="file"
            {...register('featuredIMG', {
              required: !post ? 'Image is required.' : false,
              validate: {
                fileType: handleFileValidation
              }
            })
            }
            onChange={handleInputImage}
            className="block w-full text-sm text-gray-600 
      file:mr-4 file:py-2 file:px-4
      file:rounded-lg file:border-0
      file:text-sm file:font-semibold
      file:bg-black file:text-white
      hover:file:bg-gray-800 cursor-pointer"
          />


          <div className="flex gap-6 items-center">
            {post && (
              <img
                src={previewImage}
                className="w-40 h-28 object-cover rounded-lg border"
              />
            )}
            {inputImage && (
              <img
                src={inputImage}
                className="w-40 h-28 object-cover rounded-lg border"
              />)}
          </div>
        </div>


        <div className="flex flex-col gap-2 p-3 w-[50%]">
          <label className="text-sm font-semibold text-gray-700">
            Visibility
          </label>

          <Select
            {...register('status')}
            options={selectData}
            className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>{
          errors.featuredIMG && (
            <div className="text-red-600">{errors.featuredIMG.message}</div>
          )
        }</div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition ${loading && 'cursor-not-allowed bg-gray-400'} `}
        >
          {loading ? (
            post ? 'Updating...' : 'Publishing...'
          ): (
              post ? 'EDIT' : 'Publish'
            )
          }
        </button>
      </form>
    </div>
  )
}

export default PostForm