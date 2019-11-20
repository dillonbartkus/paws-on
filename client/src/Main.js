import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './Header'
import Feed from './Feed'
import Footer from './Footer'
import PostDetails from './PostDetails'
import Profile from './Profile'
import NewPost from './NewPost'
import SERVERURL from './config'
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
  } from "react-router-dom"

export default function Main(props) {    

    const newUserToast = props.newUserToast

    const [userDropdown, setUserDropdown] = useState(false)
    const [error, setError] = useState(false)
    const [feedData, setFeedData] = useState()
  
    useEffect( () => {
      fetchFeedData()
    }, [])
  
    const fetchFeedData = async () => {
      try {      
        const res = await axios.post(`http://localhost:8080/feed`)
        setFeedData(res.data.data)
      }
      catch(err) {
        console.log(err.message)
        setError(true)
      }
    }
  
    if(error) return <p>Error loading feed. Please refresh.</p>

    return(
        
        <div
        onClick = { () => userDropdown && setUserDropdown(false) }
        className = 'main'>

            <Router>
                {/* { localStorage.pawsId && <Header setUserDropdown = {setUserDropdown} userDropdown = {userDropdown} /> } */}

                <Switch>
                    <Route
                    path='/post/:id'
                    render={ (props) => <>
                    <Header setUserDropdown = {setUserDropdown} userDropdown = {userDropdown} />
                    <PostDetails {...props} feedData = {feedData} /> </> } />

                    <Route
                    path='/profile'
                    render={ () => <>
                    <Header setUserDropdown = {setUserDropdown} userDropdown = {userDropdown} />
                    <Profile />
                    </> } />

                    <Route
                    path='/newpost'
                    render={ () => <>
                    <Header setUserDropdown = {setUserDropdown} userDropdown = {userDropdown} />
                    <NewPost /> </> } />

                    <Route
                    path='/profile'
                    render={ () => <>
                    <Header setUserDropdown = {setUserDropdown} userDropdown = {userDropdown} />
                    <Profile /> </> } />

                    <Route
                    path='/shelters'
                    render={ () => <>
                    <Header setUserDropdown = {setUserDropdown} userDropdown = {userDropdown} />
                    <NewPost /> </> } />

                    <Route
                    path='/bookmarks'
                    render={ () => <>
                    <Header setUserDropdown = {setUserDropdown} userDropdown = {userDropdown} />
                    <NewPost /> </> } />

                    <Route
                    path='/'
                    render={ () => <>
                    <Header setUserDropdown = {setUserDropdown} userDropdown = {userDropdown} />
                    <Feed feedData = {feedData} newUserToast = {newUserToast} /> </> } />

                    <Redirect to='/' />
                </Switch>
                <Footer />

            </Router>

        </div>
    )
}