import React, { useState } from 'react'
import axios from 'axios'
import Header from './Header'
import Feed from './Feed'
import Footer from './Footer'
import Login from './Login'
import Register from './Register'

export default function Main({ feedData }) {

    const [display, setDisplay] = useState('feed') // sets which component is rendered
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userBookmarks, setUserBookmarks] = useState([])
    const [userData, setUserData] = useState({
        id: '',
        name: '',
        city: '',
        avatar: ''
    })

    const getUserBookmarks = async data => {
        const res = await axios.post(`/getUserBookmarks/${data.id}`)
        console.log(res.data.data[0].array)
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

    return(
        
        <div className = 'main'>

            { display !== 'login' && display !== 'register' &&
            <Header isLoggedIn = {isLoggedIn} userData = {userData} setDisplay = {setDisplay}
            /> }

            { display === 'feed' &&
            <Feed feedData = {feedData} isLoggedIn = {isLoggedIn}
            /> }

            { display === 'login' &&
            <Login setDisplay = {setDisplay} logUserIn = {logUserIn}
            /> }

            { display === 'register' &&
            <Register 
            /> }

            { display !== 'login' && display !== 'register' &&
            <Footer 
            /> }

        </div>
    )
}