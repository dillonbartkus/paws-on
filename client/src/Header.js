import React, { useState } from 'react'
import logo from './images/pawslogo.png'
import pawson from './images/pawson.png'
import arrow from './images/selectarrow.png'
import { Redirect } from 'react-router-dom'

export default function({ userDropdown, setUserDropdown }) {

    const [redirectToLogin, setRedirectToLogin] = useState(false)
    const [redirectToRegister, setRedirectToRegister] = useState(false)
    const [redirectToHome, setRedirectToHome] = useState(false)
    const [redirectToProfile, setRedirectToProfile] = useState(false)
    const [redirectToShelters, setRedirectToShelters] = useState(false)
    const [redirectToBookmarks, setRedirectToBookmarks] = useState(false)

    const { pawsId, pawsUser, pawsAvatar } = localStorage
    
    return(

        <div className = 'header'>

            <div className = 'header-logo'>

                <img src = {logo} alt = 'logo' />

                <img src = {pawson} alt = 'pawson' />

            </div>

            {!pawsId &&
            <div className = 'header-login-signup'>

                <p
                onClick = { () => setRedirectToLogin(true) }
                >
                Log In</p>

                OR

                <button
                className = 'blue-button'
                onClick = { () => setRedirectToRegister(true) } >
                Create New Account</button>

            </div> }

            {pawsId &&
            <div className = 'header-loggedin'>

                <p>Hello {pawsUser}!</p>

                <img
                onClick = { () => setUserDropdown(!userDropdown) }
                src = {arrow} alt = '' />

                <img src = {pawsAvatar} alt = 'avatar' />

                <div className = {`user-dropdown ${userDropdown}`}>
                    <p onClick = { () => setRedirectToProfile(true) }
                    >Profile</p>

                    <p onClick = { () => setRedirectToBookmarks(true) }
                    >Bookmarked</p>

                    <p onClick = { () => setRedirectToShelters(true) }
                    >Find Shelters</p>
                    
                    <p onClick = { () => {
                        localStorage.clear()
                        setRedirectToHome(true)
                    }}
                    >Logout</p>
                </div>

            </div> }

            {redirectToHome &&
            <Redirect to='/' />}

            {redirectToLogin &&
            <Redirect push to='/login' />}

            {redirectToRegister && 
            <Redirect push to='/register' />}

            {redirectToBookmarks && 
            <Redirect push to='/bookmarks' />}

            {redirectToProfile && 
            <Redirect push to='/profile' />}

            {redirectToShelters && 
            <Redirect push to='/shelters' />}

        </div>
    )
}