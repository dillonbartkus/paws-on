import React, { useState } from 'react'
import './index.css'
import axios from 'axios'
import Main from './Main'
import Login from './Login'
import Register from './Register'
import Header from './Header'
import SERVERURL from './config'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom"

export default function App() {

  const [newUserToast, setNewUserToast] = useState('false') // toast welcoming new user

  const showNewUserToast = () => {
    setNewUserToast('true')
    setTimeout( () => setNewUserToast('fade'), 2500 )
    setTimeout( () => setNewUserToast('false'), 5000 )
  }

  return(

  <div className = 'App'>

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
          path='/'
          render={ (props) =>
          <>
            { !localStorage.pawsId && <Header /> }
            <Main {...props} newUserToast = {newUserToast} />
          </> }
        />
        <Redirect to='/' />
      </Switch>
    </Router>

  </div>

  )

}