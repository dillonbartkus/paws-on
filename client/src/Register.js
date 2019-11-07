import React, { useState } from 'react'
import Welcome from './Welcome'
import ToS from './ToS'
import axios from 'axios'
import camera from './images/camera.png'


export default function Register({ registerNewUser }) {

    const [showToS, setShowToS] = useState(false)

    const submit = async e => {
        const email = e.currentTarget.childNodes[1].value
        const password = e.currentTarget.childNodes[2].value
        const name = e.currentTarget.childNodes[3].value
        const city = e.currentTarget.childNodes[4].value
        const avatar = ''
        e.preventDefault()
        try {
            const res = await axios.post(`http://ec2-3-133-114-8.us-east-2.compute.amazonaws.com/register`, {
                email: email,
                name: name,
                password: password,
                city: city,
                avatar: avatar
            })
            registerNewUser(res.data.data)
        }
          catch(err) {
            console.log(err.message)
          }
    }

    return(
        
        <div className = 'register'>

            {showToS &&
            <ToS /> }

            <Welcome />

            <div className = 'register-main'>

            <p className = 'page-title'>Create New Account</p>

                <form className = 'reg-form'
                onSubmit = { e => submit(e) }
                >
                    <div className = 'upload-userpic'>
                        <img src = {camera} alt = '' />
                        <p className = 'upload-text'>Upload Profile Picture</p>
                    </div>

                    <input
                    placeholder = 'Email'
                    type = 'email'
                    required
                    ></input>

                    <input
                    placeholder = 'Create Password'
                    type = 'password'
                    required
                    ></input>

                    <input
                    placeholder = 'Full Name'
                    type = 'text'
                    required
                    ></input>

                    <select required>
                        <option value = ''>City</option>
                        <option value = 'New York City'>New York City</option>
                    </select>

                    <input type = 'checkbox' required></input>
                    <p className = 'accept-terms'>By clicking here you accept the
                        <span
                        onClick = { () => setShowToS(true) }
                        >Terms and  Conditions.</span>
                    </p>

                    <button className = 'green-button'>Sign Up</button>

                </form>

            </div>

        </div>
    )
}