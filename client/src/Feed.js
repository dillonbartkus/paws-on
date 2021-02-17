import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Post from './Post'
import axios from 'axios'
import { SERVERURL } from './config'
import left from './images/paws-bg-left.svg'
import right from './images/paws-bg-right.svg'
import med from './images/paws-bg-med.svg'
import small from './images/paws-bg-small.svg'

export default function Feed(props) {

    const { feedData, newUserToast, error } = props
    const [userBookmarks, setUserBookmarks] = useState([])
    const history = useHistory()

    useEffect(() => {
        if (localStorage.pawsId) getUserBookmarks()
    }, [])

    const getUserBookmarks = async () => {  // fetches boomarked posts of user and saves as an array
        const res = await axios.post(`${SERVERURL}/getUserBookmarks/${localStorage.pawsId}`)
        setUserBookmarks(res.data.data[0].array)
    }

    return error ? (
        <div className='error'> <p>Error loading feed. Please refresh.</p> </div>
    ) : (
            <div className='feed'>

                <img className='bg-small' src={small} alt='' />
                <img className='bg-small' src={small} alt='' />
                <img className='bg-med' src={med} alt='' />
                <img className='bg-med' src={med} alt='' />
                <img className='bg-left' src={left} alt='' />
                <img className='bg-right' src={right} alt='' />

                <h1 className={`toast ${newUserToast}`} >Welcome! Thank you for lending a paw :)</h1>

                {!localStorage.pawsId && <p>Welcome! Here is a list of lost and found animals. Would you like to post a lost or found cat? Create an account to share your post with everyone!</p>}

                {localStorage.pawsId && <button
                    onClick={() => history.push('/newpost')}
                    className={`blue-button ${newUserToast}`}>Create Post</button>}

                <h2 className={`lostfound ${newUserToast !== 'false' ? false : true}`}>Lost and Found Animals Posted</h2>

                {feedData && feedData.map(post => <Post post={post} key={post.id} userBookmarks={userBookmarks} />)}

            </div>
        )
}