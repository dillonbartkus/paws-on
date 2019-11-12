import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SERVERURL from './config'
import { Redirect } from 'react-router-dom'

export default function Post({ post, bookmarked }) {

    const [posterName, setPosterName] = useState()
    const [posterEmail, setPosterEmail] = useState()
    const [isBookmarked, setIsBookmarked] = useState(bookmarked ? true : false)
    const [redirectToPost, setRedirectToPost] = useState(false)

    const getPosterInfo = async () => {
        const res = await axios.post(`${SERVERURL}/post/${post.author_id}`)
        setPosterEmail(res.data.data.email)
        setPosterName(res.data.data.name)
    }

    const addBookmark = async () => {
        const res = await axios.post(`${SERVERURL}/addbookmark/${post.id}`)
        console.log(res)
    }
    
    useEffect( () => {
        getPosterInfo()
    }, [])    

    return(

        <div onClick = { () => setRedirectToPost(true) } className = 'post'>

            <div className = 'post-pic' style = {{'backgroundImage': `url(${post.picture_one})` }} ></div>

            <div className = 'post-content'>

                {localStorage.pawsId && <div
                onClick = { () => {
                    setIsBookmarked(!isBookmarked)
                    addBookmark()
                }}
                 className = {`bookmark ${isBookmarked}`}> </div> }

                <p className = 'post-title'>{post.title}</p>

                <p className = 'posted-by'>Posted by <span>{posterName}</span></p>

                <p className = 'post-subheader'>Description</p>
                <p className = 'post-desc'>{post.description}</p>

                <p className = 'post-subheader'>Address</p>
                <p className = 'post-desc'>{post.address}</p>

                <button
                onClick = { e => {
                    e.stopPropagation()
                    window.location.href = `mailto:${posterEmail}`
                }}
                className = 'green-button'>Contact</button>

            </div>

            {redirectToPost && 
            <Redirect push to={`/post/${post.id}`} />}

        </div>

    )
}