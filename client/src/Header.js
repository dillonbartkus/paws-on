import React from 'react'
import { useHistory } from 'react-router-dom'
import logo from './images/pawslogo.svg'
import pawson from './images/pawson.svg'
import arrow from './images/selectarrow.svg'

export default function Header (props) {

    const { userDropdown, setUserDropdown } = props
    const { pawsId, pawsUser, pawsAvatar } = localStorage
    const history = useHistory()
    
    return(

        <div className = 'header'>

            <div className = 'header-logo'>

                <img src = {logo} alt = 'logo' />

                <img src = {pawson} alt = 'pawson' />

            </div>

            {!pawsId &&
            <div className = 'header-login-signup'>

                <p
                onClick = { () => history.push('/login') }
                >
                Log In</p>

                OR

                <button
                className = 'blue-button'
                onClick = { () => history.push('/register') } >
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
                    <p onClick = { () => history.push('/profile') }
                    >Profile</p>

                    <p onClick = { () => history.push('/bookmarks') }
                    >Bookmarked</p>

                    <p onClick = { () => history.push('/shelters') }
                    >Find Shelters</p>
                    
                    <p onClick = { () => {
                        localStorage.clear()
                        history.push('/')
                    }}
                    >Logout</p>
                </div>

            </div> }

        </div>
    )
}