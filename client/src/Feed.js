import React, { useState, useEffect } from 'react'
import Post from './Post'
import axios from 'axios'

export default function Feed({ feedData, newUserToast }) {

    const [userBookmarks, setUserBookmarks] = useState([])

    useEffect( () => {        
        if(localStorage.pawsId) getUserBookmarks()
    }, [])

    const getUserBookmarks = async () => {  // fetches boomarked posts of user and saves as an array
        const res = await axios.post(`http://localhost:8080/getUserBookmarks/${localStorage.pawsId}`)
        setUserBookmarks(res.data.data[0].array)
    }    
        
    return(

        <div className = 'feed'>

            <h1 className = {`toast ${newUserToast}`} >Welcome! Thank you for lending a paw :)</h1>

            {!localStorage.pawsId && <p>Welcome! Here is a list of Lost and Found Cats. Would you like to post a lost or found cat? Create an account to share your post with everyone!</p> }

            <h2 className = {`lostfound ${newUserToast !== 'false' ? false : true}`}>Lost and Found Cats Posted</h2>
            
            {feedData && feedData.map( post => <Post post = {post} key = {post.id} userBookmarks = {userBookmarks} /> )}

        </div>
    )
}