import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './Header'
import Feed from './Feed'
import Footer from './Footer'
import PostDetails from './PostDetails'
import Profile from './Profile'
import SERVERURL from './config'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom"

export default function Main(props) {

    const { feedData, newUserToast } = props
    
    const [userBookmarks, setUserBookmarks] = useState([])
    const [userDropdown, setUserDropdown] = useState(false)

    useEffect( () => {
        if(localStorage.pawsId) getUserBookmarks()
    }, [])

    const getUserBookmarks = async data => {  // fetches boomarked posts of user and saves as an array
        const res = await axios.post(`${SERVERURL}/getUserBookmarks/${localStorage.pawsId}`)
        console.log(res.data.data)
        setUserBookmarks(res.data.data[0].array)
    }

    return(
        
        <div
        onClick = { () => userDropdown && setUserDropdown(false) }
        className = 'main'>

            <Header setUserDropdown = {setUserDropdown} userDropdown = {userDropdown} />

            <Router>
                <Switch>
                    <Route
                    path='/post/:id'
                    render={ (props) => <PostDetails {...props} feedData = {feedData} />}
                    />
                    <Route
                    path='/profile'
                    render={ () => <Profile />}
                    />
                    <Route
                    path='/'
                    render={ () => <Feed feedData = {feedData} newUserToast = {newUserToast} userBookmarks = {userBookmarks} /> }
                    />

                </Switch>
            </Router>

            {/* <Feed feedData = {feedData} userBookmarks = {userBookmarks} /> */}

            <Footer />

        </div>
    )
}