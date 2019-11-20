import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom'

export default function(props) {

    // const feedData = props.feedData

    const [post, setPost] = useState()
    const [redirectToNewPost, setRedirectToNewPost] = useState()

    useEffect( () => {
        fetchPost()
    })

    const fetchPost = () => {
        const ind = parseInt(props.match.params.id - 1)
        setPost(props.feedData[ind])
    }

    // console.log(post)
    
    return(
        
        <div className = 'postdetails'>

            {localStorage.pawsId && <button
            onClick = { () => setRedirectToNewPost(true) }
            className = 'blue-button'>Create Post</button> }

            {redirectToNewPost && 
            <Redirect push to='/newpost' />}

        </div>
    )
}