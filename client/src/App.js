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
import { SERVERURL } from './config'
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

  useEffect(() => {
    fetchFeedData()
  }, [])

  const fetchFeedData = async () => {
    try {
      const res = await axios.post(`${SERVERURL}/feed`)
      setFeedData(res.data.data)
    }
    catch (err) {
      console.log(err.message)
      setError(true)
    }
  }

  const showNewUserToast = () => {
    setNewUserToast('true')
    setTimeout(() => setNewUserToast('fade'), 2500)
    setTimeout(() => setNewUserToast('false'), 5000)
  }

  return (
    <div
      onClick={() => userDropdown && setUserDropdown(false)}
      className='App'>

      <Router>
        <Switch>

          <Route
            exact path='/login'
            render={() => <Login />} />

          <Route
            exact path='/register'
            render={() => <Register showToast={showNewUserToast} />} />

          <Switch>
            <Route
              exact path='/post/:id'
              render={() => <>
                <Header setUserDropdown={setUserDropdown} userDropdown={userDropdown} />
                <PostDetails feedData={feedData} />
                <Footer /> </>} />

            <Route
              exact path='/profile'
              render={() => <>
                <Header setUserDropdown={setUserDropdown} userDropdown={userDropdown} />
                <Profile />
                <Footer /> </>} />

            <Route
              exact path='/newpost'
              render={() => <>
                <Header setUserDropdown={setUserDropdown} userDropdown={userDropdown} />
                <NewPost />
                <Footer /> </>} />

            <Route
              exact path='/profile'
              render={() => <>
                <Header setUserDropdown={setUserDropdown} userDropdown={userDropdown} />
                <Profile />
                <Footer /> </>} />

            <Route
              exact path='/shelters'
              render={() => <>
                <Header setUserDropdown={setUserDropdown} userDropdown={userDropdown} />
                <Shelters />
                <Footer /> </>} />

            <Route
              exact path='/bookmarks'
              render={() => <>
                <Header setUserDropdown={setUserDropdown} userDropdown={userDropdown} />
                <Bookmarks />
                <Footer /> </>} />

            <Route
              exact path='/'
              render={() => <>
                <Header setUserDropdown={setUserDropdown} userDropdown={userDropdown} />
                <Feed feedData={feedData} newUserToast={newUserToast} error={error} />
                <Footer /> </>} />

            <Redirect to='/' />

          </Switch>
        </Switch>
      </Router>
    </div>
  )
}