import React, { useEffect, useState } from 'react'
import { AddData } from '../api/postAPI'
import { PatchData } from '../api/postAPI'

function Form({ data, setData, setEditable, editable }) {

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    function handleChange(e) {
        if (e.target.name === 'title') {
            setTitle(e.target.value)
        }
        else if (e.target.name === 'post') {
            setBody(e.target.value)
        }

    }

    async function handleClick() {
        if (!editable) {
            const newPost = {
                userId: 1,
                id: Date.now(),
                title: title,
                body: body
            }
            await AddData(newPost)

            setData([newPost, ...data])
        }
        else {
            const newPost = {
                ...editable,
                title,
                body,
            }
            await PatchData(editable.id, newPost)

            setData(prev =>
                prev.map(post =>
                    post.id === editable.id
                        ? { ...post, ...newPost }
                        : post
                )
            )

            setEditable(null)

        }


    }

    useEffect(() => {

        if (editable) {
            setTitle(editable.title)
            setBody(editable.body)
        }

    }, [editable])



    return (
        <div>
            <input name='title' value={title} onChange={handleChange} type="text" placeholder='TITLE' />
            <input name='post' value={body} onChange={handleChange} type="text" placeholder='POST' />

            <button onClick={handleClick}>{editable ? 'EDIT' : 'ADD'}</button>
        </div>
    )
}

export default Form