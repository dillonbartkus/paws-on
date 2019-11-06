import React from 'react'
import axios from 'axios'
import Welcome from './Welcome'

export default function({ setDisplay, logUserIn }) {

    const checkCredentials = async e => {
        const email = e.currentTarget.childNodes[0].value
        const pw = e.currentTarget.childNodes[1].value
        e.preventDefault()
        try {
        const res = await axios.post(`/login`, {
            email: email,
            pw: pw
          })
          await logUserIn(res.data.data)
        }
          catch(err) {
            console.log(err.message)
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
                    <p className = 'forgotpw'>Forgot password?</p>

                    <button className = 'green-button'>Log In</button>

                </form>

                <button className = 'blue-button'
                onClick = { () => setDisplay('register') }
                >Create New Account</button>

            </div>

        </div>
    )
}