import React from 'react'
import Post from './Post'

export default function Feed({ feedData, isLoggedIn }) {
    
    return(

        <div className = 'feed'>

            {!isLoggedIn && <p>Welcome! Here is a list of Lost and Found Cats. Would you like to post a lost or found cat? Create an account to share your post with everyone!</p> }

            <h2>Lost and Found Cats Posted</h2>
            
            {feedData && feedData.map( (post, id) => <Post post = {post} isLoggedIn = {isLoggedIn} key = {id} /> )}

        </div>
    )
}