import React, { useState, useEffect } from 'react'
import Post from './Post'
import axios from 'axios'
import left from './images/paws-bg-left.png'
import right from './images/paws-bg-right.png'
import med from './images/paws-bg-med.png'
import small from './images/paws-bg-small.png'
import { Redirect } from 'react-router-dom'

export default function Feed({ feedData, newUserToast }) {

    const [userBookmarks, setUserBookmarks] = useState([])
    const [redirectToNewPost, setRedirectToNewPost] = useState()    

    useEffect( () => {        
        if(localStorage.pawsId) getUserBookmarks()
    }, [])

    const getUserBookmarks = async () => {  // fetches boomarked posts of user and saves as an array
        const res = await axios.post(`http://localhost:8080/getUserBookmarks/${localStorage.pawsId}`)
        setUserBookmarks(res.data.data[0].array)
    }
        
    return(

        <div className = 'feed'>

            <img className = 'bg-small' src = {small} alt = '' />
            <img className = 'bg-small' src = {small} alt = '' />
            <img className = 'bg-med' src = {med} alt = '' />
            <img className = 'bg-med' src = {med} alt = '' />
            <img className = 'bg-left' src = {left} alt = '' />
            <img className = 'bg-right' src = {right} alt = '' />

            <h1 className = {`toast ${newUserToast}`} >Welcome! Thank you for lending a paw :)</h1>

            {!localStorage.pawsId && <p>Welcome! Here is a list of Lost and Found Cats. Would you like to post a lost or found cat? Create an account to share your post with everyone!</p> }

            {localStorage.pawsId && <button
            onClick = { () => setRedirectToNewPost(true) }
            className = {`blue-button ${newUserToast}`}>Create Post</button> }

            <h2 className = {`lostfound ${newUserToast !== 'false' ? false : true}`}>Lost and Found Cats Posted</h2>
            
            {feedData && feedData.map( post => <Post post = {post} key = {post.id} userBookmarks = {userBookmarks} /> )}

            {redirectToNewPost && 
            <Redirect push to='/newpost' />}

        </div>
    )
}