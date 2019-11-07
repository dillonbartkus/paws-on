import React, { useState } from 'react'
import axios from 'axios'
import Welcome from './Welcome'
import SERVERURL from './config'

export default function({ setDisplay, logUserIn }) {

    const [invalidCred, setInvalidCred] = useState(false)

    const checkCredentials = async e => {
        const email = e.currentTarget.childNodes[0].value
        const pw = e.currentTarget.childNodes[1].value
        e.preventDefault()
        try {
        const res = await axios.post(`${SERVERURL}/login`, {
            email: email,
            pw: pw
          })          
          await logUserIn(res.data.data)
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
                    required
                    ></input>

                    <input
                    placeholder = 'Password'
                    type = 'password'
                    required
                    ></input>
                    <p
                    onClick = { () => window.location.href = `mailto:dillonbartkus@gmail.com?subject=Paws%20On%20PW%20Reset` }
                    className = 'forgotpw'>Forgot password?</p>

                    {invalidCred && <p className = 'invalidcred'>Invalid credentials.</p>}

                    <button className = 'green-button'>Log In</button>

                </form>

                <button className = 'blue-button'
                onClick = { () => setDisplay('register') }
                >Create New Account</button>

            </div>

        </div>
    )
}