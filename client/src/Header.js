import React from 'react'
import logo from './images/pawslogo.png'
import pawson from './images/pawson.png'
import arrow from './images/selectarrow.png'

export default function({ isLoggedIn, setDisplay, userData }) {
    
    return(

        <div className = 'header'>

            <div className = 'header-logo'>

                <img src = {logo} alt = 'logo' />

                <img src = {pawson} alt = 'pawson' />

            </div>

            {!isLoggedIn &&
            <div className = 'header-login-signup'>

                <p
                onClick = { () => setDisplay('login') } >
                Log In</p>

                OR

                <button
                className = 'blue-button'
                onClick = { () => setDisplay('register') } >
                Create New Account</button>

            </div> }

            {isLoggedIn &&
            <div className = 'header-loggedin'>

                <p>Hello {userData.name}!</p>

                <img src = {arrow} alt = '' />

                <img src = {userData.avatar} alt = 'user pic' />

            </div> }

        </div>
    )
}