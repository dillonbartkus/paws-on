import React from 'react'
import logo from './images/pawslogo.png'
import pawson from './images/pawson.png'

export default function() {

    return(
        <div className = 'header'>

            <div className = 'header-logo'>

                <img src = {logo} alt = 'logo' />

                <img src = {pawson} alt = 'pawson' />

                {/* <p>PawsOn</p> */}

            </div>

            <div className = 'header-login-signup'>

                <p>Log In</p>

                OR

                <button>Create New Account</button>

            </div>

        </div>
    )
}