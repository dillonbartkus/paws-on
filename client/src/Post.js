import React, { useState, useEffect } from 'react'
import axios from 'axios'
import bookmark from './images/bookmark.png'
import SERVERURL from './config'

export default function Post({ post, isLoggedIn }) {

    const [posterName, setPosterName] = useState()
    const [posterEmail, setPosterEmail] = useState()

    const getPosterInfo = async () => {
        const res = await axios.post(`${SERVERURL}/post/${post.author_id}`)
        setPosterEmail(res.data.data.email)
        setPosterName(res.data.data.name)
    }

    useEffect( () => {
        getPosterInfo()
    })    

    return(

        <div className = 'post'>

            <div className = 'post-pic' style = {{'backgroundImage': `url(${post.picture_one})` }} ></div>

            <div className = 'post-content'>

                {isLoggedIn && <img
                onClick = { e => {
                    e.stopPropagation()
                }}
                src = {bookmark} className = 'bookmark' /> }

                <p className = 'post-title'>{post.title}</p>

                <p className = 'posted-by'>Posted by <span>{posterName}</span></p>

                <p className = 'post-subheader'>Description</p>
                <p className = 'post-desc'>{post.description}</p>

                <p className = 'post-subheader'>Address</p>
                <p className = 'post-desc'>{post.address}</p>

                <button
                onClick = { () => window.location.href = `mailto:${posterEmail}` }
                className = 'green-button'>Contact</button>

            </div>

        </div>

    )
}