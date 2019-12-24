import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

export default function({ post }) {    

    const [redirectToPost, setRedirectToPost] = useState(false)

    return(
        
        <div onClick = { () => setRedirectToPost(true) } className = 'post'>

            <div className = 'post-pic' style = {{'backgroundImage': `url(${post.picture_one})` }} ></div>

            <div className = 'post-content'>

                <p className = 'post-title'>{post.title}</p>

                <p className = 'posted-by'>Posted by <span>{post.name}</span></p>

                <p className = 'post-subheader'>Description</p>
                <p className = 'post-desc'>{post.description}</p>

                <p className = 'post-subheader'>Address</p>
                <p className = 'post-desc'>{post.address}</p>

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