import React, { useState } from 'react'
import logo from './images/pawslogo.png'
import pawson from './images/pawson.png'
import arrow from './images/selectarrow.png'
import { Redirect } from 'react-router-dom'

export default function({ userDropdown, setUserDropdown }) {

    const [redirectToLogin, setRedirectToLogin] = useState(false)
    const [redirectToRegister, setRedirectToRegister] = useState(false)

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

                <img src = {pawsAvatar} alt = 'user pic' />

                <div className = {`user-dropdown ${userDropdown}`}>
                    <p>Profile</p>
                    <p>Bookmarked</p>
                    <p>Find Shelters</p>
                </div>

            </div> }

            {redirectToLogin &&
            <Redirect push to='/login' />}

            {redirectToRegister && 
            <Redirect push to='/register' />}

        </div>
    )
}