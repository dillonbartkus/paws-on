import React, { useState } from 'react'
import axios from 'axios'
import Welcome from './Welcome'
// import SERVERURL from './config'
import setUserData from './lib/setUserData'
import { Redirect } from 'react-router-dom'

export default function Login() {
    
    const [invalidCred, setInvalidCred] = useState(false)
    const [redirectToRegister, setRedirectToRegister] = useState(false)
    const [redirectToFeed, setRedirectToFeed] = useState(false)

    const checkCredentials = async e => {
        const email = e.currentTarget.childNodes[0].value
        const pw = e.currentTarget.childNodes[1].value
        e.preventDefault()
        try {            
            const res = await axios.post(`http://localhost:8080/login`, {
                email: email,
                pw: pw
            })            
            setUserData(res.data.data)
            setRedirectToFeed(true)
        }
        catch(err) {
            console.log(err.message)
            setInvalidCred(true)
        }
    }

    return(
        
        <div className = 'login'>

            <Welcome />

            <div className = 'login-main'>

                <p className = 'page-title'>Log In</p>

                <form className = 'login-form'
                onSubmit = { e => checkCredentials(e) }
                >

                    <input
                    placeholder = 'Email'
                    type = 'email'
                    name = 'email'
                    autoFocus
                    required
                    ></input>

                    <input
                    placeholder = 'Password'
                    type = 'password'
                    name = 'password'
                    required
                    ></input>
                    <p
                    onClick = { () => window.location.href = `mailto:dillonbartkus@gmail.com?subject=Paws-On PW Reset` }
                    className = 'forgotpw'>Forgot password?</p>

                    {invalidCred && <p className = 'invalidcred'>Invalid credentials.</p>}

                    <button className = 'green-button'>Log In</button>

                </form>

                <button className = 'blue-button'
                onClick = { () => setRedirectToRegister(true) }
                >Create New Account</button>

            </div>

            {redirectToRegister && 
            <Redirect push to='/register' />}

            {redirectToFeed && 
            <Redirect push to='/' />}

        </div>
    )
}