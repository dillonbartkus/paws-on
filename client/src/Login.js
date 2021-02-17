import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Welcome from './Welcome'
import { SERVERURL } from './config'
import setUserData from './helpers/setUserData'

export default function Login() {

    const [invalidCred, setInvalidCred] = useState(false)
    const history = useHistory()

    const checkCredentials = async e => {
        const email = e.currentTarget.childNodes[0].value
        const pw = e.currentTarget.childNodes[1].value
        e.preventDefault()
        try {
            const res = await axios.post(`${SERVERURL}/login`, {
                email: email,
                pw: pw
            })
            setUserData(res.data.data)
            history.push('/')
        }
        catch (err) {
            setInvalidCred(true)
        }
    }

    return (

        <div className='login'>

            <Welcome />

            <div className='login-main'>

                <p className='page-title'>Log In</p>

                <form className='login-form'
                    onSubmit={e => checkCredentials(e)}
                >

                    <input
                        placeholder='Email'
                        type='email'
                        name='email'
                        autoFocus
                        required
                    ></input>

                    <input
                        placeholder='Password'
                        type='password'
                        name='password'
                        required
                    ></input>
                    <p
                        onClick={() => window.location.href = `mailto:dillonbartkus@gmail.com?subject=Paws-On PW Reset&body=Hello, I have forgotten my password for Paws-On. Please help!`}
                        className='forgotpw'>Forgot password?</p>

                    {invalidCred && <p className='invalidcred'>Invalid credentials.</p>}

                    <button className='green-button'>Log In</button>

                </form>

                <button className='blue-button'
                    onClick={() => history.push('/register')}
                >Create New Account</button>

            </div>

        </div>
    )
}