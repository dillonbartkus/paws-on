import React, { useState, useEffect } from 'react'
import './index.css'
import axios from 'axios'
import Main from './Main'
import Login from './Login'
import Register from './Register'
import SERVERURL from './config'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

export default function App() {

  const [error, setError] = useState(false)
  const [feedData, setFeedData] = useState()
  const [newUserToast, setNewUserToast] = useState('false') // toast welcoming new user  

  useEffect( () => {
    fetchFeedData()
  }, [])

  const fetchFeedData = async () => {
    try {      
      const res = await axios.post(`${SERVERURL}/feed`)
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

  if(error) return <p>Error loading feed. Please refresh.</p>

  return(

  <div className = 'App'>

    <Router>
      <Switch>
        <Route
          path='/login'
          render={ () => <Login />}
        />
        <Route
          path='/register'
          render={ () => <Register showToast = {showNewUserToast} />}
        />
        <Route
          path='/'
          render={ (props) => <Main {...props} newUserToast = {newUserToast} feedData={feedData} />}
        />
      </Switch>
    </Router>

  </div>

  )

}