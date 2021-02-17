import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import MyPost from './MyPost'
import axios from 'axios'
import { SERVERURL } from './config'

export default function Profile() {

    const { pawsUser, pawsZip, pawsEmail, pawsAvatar } = localStorage
    const [myPosts, setMyPosts] = useState()
    const [editZip, setEditZip] = useState(false)
    const [newZip, setNewZip] = useState(pawsZip)
    const [editName, setEditName] = useState(false)
    const [newName, setNewName] = useState(pawsUser)
    const [editPW, setEditPW] = useState(false)
    const [newPW, setNewPW] = useState('')
    const [pwChanged, setPwChanged] = useState(false)
    const [pwLengthError, setPwLengthError] = useState(false)
    const history = useHistory()

    useEffect(() => {
        getMyPosts()
    }, [])

    const getMyPosts = async () => {
        const res = await axios.post(`${SERVERURL}/myposts/3`)
        setMyPosts(res.data.data)
    }

    const changePW = async () => {
        const res = await axios.put(`${SERVERURL}/changepw/3`, { password: newPW })
        console.log(res)
    }

    return (

        <div className='profile-page'>

            <div className='profile'>

                <img src={pawsAvatar} alt='avatar' />

                <div className='userinfo'>

                    <div className='userinfo-section'>
                        <p className='post-subheader'>Name</p>
                        <p className='post-subheader'>Email</p>
                        <p className='post-subheader'>Zip Code</p>
                        <p className={`post-subheader ${pwChanged ? '' : 'edit'}`}
                            onClick={() => !editName && !editZip && setEditPW(!editPW)}
                        >{pwChanged ? 'Password Changed!' : 'Change Password'}</p>

                        {pwLengthError && <p className='pw-error'>Password length must be longer than 5 characters.</p>}
                    </div>

                    <div className='userinfo-section'>
                        {editName ?
                            <input
                                onChange={e => setNewName(e.target.value)}
                                value={newName}
                                name='name'
                                autoFocus
                            ></input> :
                            <p className='post-subheader'>{pawsUser}</p>}

                        <p className='post-subheader'>{pawsEmail}</p>

                        {editZip ?
                            <input
                                onChange={e => setNewZip(e.target.value)}
                                value={newZip}
                                name='zip'
                                maxLength='5'
                                minLength='5'
                                autoFocus
                            ></input> :
                            <p className='post-subheader'>{pawsZip}</p>}

                        {editPW ?
                            <input
                                onChange={e => setNewPW(e.target.value)}
                                value={newPW}
                                type='password'
                                autoFocus
                            ></input> :
                            <p className='post-subheader empty'></p>}
                    </div>

                    <div className='userinfo-section'>
                        <p className='post-subheader edit'
                            onClick={() => !editPW && !editZip && setEditName(!editName)}
                        >{editName ? 'Done' : 'Edit'}</p>

                        <p className='post-subheader empty'></p>

                        <p className='post-subheader edit'
                            onClick={() => !editName && !editPW && setEditZip(!editZip)}
                        >{editZip ? 'Done' : 'Edit'}</p>

                        {editPW ?
                            <p className='post-subheader edit'
                                onClick={() => {
                                    if (newPW.length > 5) {
                                        changePW()
                                        setEditPW(false)
                                        setPwChanged(true)
                                        setPwLengthError(false)
                                    } else setPwLengthError(true)
                                }}
                            >Done</p> :
                            <p className='post-subheader empty'></p>}
                    </div>


                </div>

            </div>

            <div className='my-posts'>

                <h2 className='lostfound'>My Posts</h2>

                {myPosts && myPosts.map(post => <MyPost post={post} key={post.id} />)}

            </div>

            <div className='profile-bottom'>

                <button className='blue-button'
                    onClick={() => history.push('/newpost')}>
                    Create Post</button>

                <p className='returnhome'
                    onClick={() => history.push('/')}
                    style={{}}>
                    Return Home</p>

            </div>

        </div>
    )
}