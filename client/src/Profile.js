import React, { useEffect, useState } from 'react'
import MyPost from './MyPost'
import axios from 'axios'
// import config from './config'

export default function(props) {

    const [myPosts, setMyPosts] = useState()
    const { pawsUser, pawsZip, pawsEmail, pawsAvatar } = localStorage

    useEffect( () => {        
        getMyPosts()
    }, [])

    const getMyPosts = async () => {
        const res = await axios.post(`http://localhost:8080/myposts/3`)
        setMyPosts(res.data.data)
    }    

    return(
        
        <div className = 'profile-page'>

            <div className = 'profile'>

                <img src = {pawsAvatar} alt = 'avatar' />

                <div className = 'userinfo'>

                    <div className = 'userinfo-section'>
                        <p className = 'post-subheader'>Name</p>
                        <p className = 'post-subheader'>Zip Code</p>
                        <p className = 'post-subheader'>Email</p>
                        <p className = 'post-subheader'>Reset Password</p>
                    </div>

                    <div className = 'userinfo-section'>
                        <p className = 'post-subheader'>{pawsUser}</p>
                        <p className = 'post-subheader'>{pawsZip}</p>
                        <p className = 'post-subheader'>{pawsEmail}</p>
                        <p className = 'post-subheader'></p>
                    </div>

                    <div className = 'userinfo-section'>
                        <p className = 'post-subheader'>Edit</p>
                        <p className = 'post-subheader'>Edit</p>
                        <p className = 'post-subheader'></p>
                        <p className = 'post-subheader'></p>
                    </div>

                </div>

            </div>

            <div className = 'my-posts'>

                <h2 className = 'lostfound'>My Posts</h2>

                {myPosts && myPosts.map( post => <MyPost post = {post} key = {post.id} /> )}

            </div>

            <div className = 'profile-bottom'>

                <button className = 'blue-button'
                onClick = { () => props.history.push('/newpost') }>
                Create Post</button>

                <p className = 'returnhome'
                onClick = { () => props.history.push('/') }
                style = {{  }}>
                Return Home</p>

            </div>

        </div>
    )
}