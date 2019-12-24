import React, { useState, useEffect } from 'react'
import './index.css'
import axios from 'axios'
import Login from './Login'
import Register from './Register'
import Header from './Header'
import Feed from './Feed'
import Footer from './Footer'
import PostDetails from './PostDetails'
import Profile from './Profile'
import NewPost from './NewPost'
import Shelters from './Shelters'
import Bookmarks from './Bookmarks'
// import config from './config'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom"

export default function App() {

  const [newUserToast, setNewUserToast] = useState('false') // toast welcoming new user
  const [feedData, setFeedData] = useState()
  const [userDropdown, setUserDropdown] = useState(false)
  const [error, setError] = useState(false)
  
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

  const showNewUserToast = () => {
    setNewUserToast('true')
    setTimeout( () => setNewUserToast('fade'), 2500 )
    setTimeout( () => setNewUserToast('false'), 5000 )
  }

  if(error) return <div className = 'error'> <p>Error loading feed. Please refresh.</p> </div>

  return(

  <div
  onClick = { () => userDropdown && setUserDropdown(false) }
  className = 'App'>

    <Router>
      <Switch>
        <Route
        exact path='/login'
        render={ () => <Login />}
        />

        <Route
        exact path='/register'
        render={ () => <Register showToast = {showNewUserToast} />}
        />

        <Route
        exact path='/post/:id'
        render={ (props) => <>
        <Header {...props} setUserDropdown = {setUserDropdown} userDropdown = {userDropdown} />
        <PostDetails {...props} feedData = {feedData} /> 
        <Footer /> </> } />

        <Route
        exact path='/profile'
        render={ (props) => <>
        <Header {...props} setUserDropdown = {setUserDropdown} userDropdown = {userDropdown} />
        <Profile {...props} />
        <Footer /> </> } />

        <Route
        exact path='/newpost'
        render={ (props) => <>
        <Header {...props} setUserDropdown = {setUserDropdown} userDropdown = {userDropdown} />
        <NewPost />
        <Footer /> </> } />

        <Route
        exact path='/profile'
        render={ (props) => <>
        <Header {...props} setUserDropdown = {setUserDropdown} userDropdown = {userDropdown} />
        <Profile {...props} />
        <Footer /> </> } />

        <Route
        exact path='/shelters'
        render={ (props) => <>
        <Header {...props} setUserDropdown = {setUserDropdown} userDropdown = {userDropdown} />
        <Shelters />
        <Footer /> </> } />

        <Route
        exact path='/bookmarks'
        render={ (props) => <>
        <Header {...props} setUserDropdown = {setUserDropdown} userDropdown = {userDropdown} />
        <Bookmarks />
        <Footer /> </> } />

        <Route
        exact path='/'
        render={ (props) => <>
        <Header {...props} setUserDropdown = {setUserDropdown} userDropdown = {userDropdown} />
        <Feed {...props} feedData = {feedData} newUserToast = {newUserToast} /> 
        <Footer /> </> } />

        <Redirect to='/' />
      </Switch>
    </Router>
  </div>
  )
}