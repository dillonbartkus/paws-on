import React, {useState, useEffect} from 'react'

export default function(props) {

    const feedData = props.feedData

    const [post, setPost] = useState()

    useEffect( () => {
        fetchPost()
    })

    const fetchPost = () => {
        const ind = parseInt(props.match.params.id - 1)
        setPost(props.feedData[ind])
    }
    console.log(post)
    
    return(
        
        <div className = 'postdetails'>



        </div>
    )
}