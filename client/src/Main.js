import React, { useState } from 'react'
import axios from 'axios'
import Header from './Header'
import Feed from './Feed'
import Footer from './Footer'
import Login from './Login'
import Register from './Register'
import SERVERURL from './config'

export default function Main({ feedData }) {

    const [display, setDisplay] = useState('feed') // which component is rendered below header. toggles between feed, profile, login /reg
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userBookmarks, setUserBookmarks] = useState([])
    const [newUserToast, setNewUserToast] = useState('false') // toast welcoming new user
    const [userData, setUserData] = useState({
        id: '',
        name: '',
        city: '',
        avatar: ''
    })

    const getUserBookmarks = async data => {  // fetches boomarked posts of user and saves as an array
        const res = await axios.post(`${SERVERURL}/getUserBookmarks/${data.id}`)
        setUserBookmarks(res.data.data[0].array)
    }
    
    const logUserIn = data => {
        setIsLoggedIn(true)
        setUserData({
            id: data.id,
            name: data.name,
            city: data.city,
            avatar: data.avatar
        })
        getUserBookmarks(data)
        setDisplay('feed')
    }

    const registerNewUser = data => {
        setIsLoggedIn(true)
        setUserData({
            id: data.id,
            name: data.name,
            city: data.city,
            avatar: data.avatar
        })
        setDisplay('feed')
        setNewUserToast('true')
        setTimeout( () => setNewUserToast('fade'), 2500 )
        setTimeout( () => setNewUserToast('false'), 5000 )
    }

    return(
        
        <div className = 'main'>

            { display !== 'login' && display !== 'register' &&
            <Header isLoggedIn = {isLoggedIn} userData = {userData} setDisplay = {setDisplay}
            /> }

            <h1 className = {`toast ${newUserToast}`} >Welcome! Thank you for lending a paw :)</h1>

            { display === 'feed' &&
            <Feed feedData = {feedData} isLoggedIn = {isLoggedIn}
            /> }

            { display === 'login' &&
            <Login setDisplay = {setDisplay} logUserIn = {logUserIn}
            /> }

            { display === 'register' &&
            <Register registerNewUser = {registerNewUser}
            /> }

            { display !== 'login' && display !== 'register' &&
            <Footer 
            /> }

        </div>
    )
}