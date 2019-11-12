import React from 'react'
import Post from './Post'

export default function Feed({ feedData, userBookmarks, newUserToast }) {
        
    return(

        <div className = 'feed'>

            <h1 className = {`toast ${newUserToast}`} >Welcome! Thank you for lending a paw :)</h1>

            {!localStorage.pawsId && <p>Welcome! Here is a list of Lost and Found Cats. Would you like to post a lost or found cat? Create an account to share your post with everyone!</p> }

            <h2 className = {`lostfound ${newUserToast != 'false' ? false : true}`}>Lost and Found Cats Posted</h2>
            
            {feedData && feedData.map( post => <Post post = {post} key = {post.id} bookmarked = {userBookmarks.filter( bm => bm === post.id ).length > 0} /> )}

        </div>
    )
}