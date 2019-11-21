import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SERVERURL from './config'
import { Redirect } from 'react-router-dom'

export default function Post({ post, userBookmarks }) {    

    const [isBookmarked, setIsBookmarked] = useState(false)
    const [redirectToPost, setRedirectToPost] = useState(false)

    useEffect( () => {        
        if(userBookmarks.filter( bm => bm === post.id ).length) setIsBookmarked(true)
    }, [userBookmarks, post.id])

    const addBookmark = async () => {
        await axios.post(`http://localhost:8080/addbookmark/${localStorage.pawsId}`, {
            post_id: post.id
        })
    }

    const removeBookmark = async () => {
        const data = {
            user_id: localStorage.pawsId,
            post_id : post.id
        }
        await axios.delete(`http://localhost:8080/removebookmark`, {data: data})
    }   

    return(

        <div onClick = { () => setRedirectToPost(true) } className = 'post'>

            <div className = 'post-pic' style = {{'backgroundImage': `url(${post.picture_one})` }} ></div>

            <div className = 'post-content'>

                {localStorage.pawsId && <div
                onClick = { async e => {
                    e.stopPropagation()                    
                    if(!isBookmarked) addBookmark()
                    if(isBookmarked) removeBookmark()
                    setIsBookmarked(!isBookmarked)
                }}
                 className = {`bookmark ${isBookmarked}`}> </div> }

                <p className = 'post-title'>{post.title}</p>

                <p className = 'posted-by'>Posted by <span>{post.name}</span></p>

                <p className = 'post-subheader'>Description</p>
                <p className = 'post-desc'>{post.description}</p>

                <p className = 'post-subheader'>Address</p>
                <p className = 'post-desc'>{post.address}</p>

                <button
                onClick = { e => {
                    e.stopPropagation()
                    window.location.href = `mailto:${post.email}`
                }}
                className = 'green-button'>Contact</button>

            </div>

            {redirectToPost && 
                <Redirect push to={{
                pathname: `/post/${post.id}`,
                state: { id: post.id }
                }}
            /> }

        </div>

    )
}