import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default function(props) {

    const [post, setPost] = useState()
    const [redirectToNewPost, setRedirectToNewPost] = useState()

    useEffect( () => {
        fetchPost()
    }, [])

    const fetchPost = async () => {
        if(props.feedData) {
            const ind = await parseInt(props.match.params.id - 1)
            setPost(props.feedData[ind])
        } else {
            const res = await axios.post(`http://localhost:8080/post/${props.location.state.id}`)
            setPost(res.data.data)
        }
    }
    
    return(
        
        <div className = 'postdetails'>

            {localStorage.pawsId && <button
            onClick = { () => setRedirectToNewPost(true) }
            className = 'blue-button'>Create Post</button> }

            <h2 className = 'lostfound'>Lost and Found Cats Posted</h2>

            { post &&
                post.title
            }

            {redirectToNewPost && 
            <Redirect push to='/newpost' />}

        </div>
    )
}