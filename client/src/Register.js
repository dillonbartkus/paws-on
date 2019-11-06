import React, { useState } from 'react'
import Welcome from './Welcome'
import ToS from './ToS'
import camera from './images/camera.png'


export default function() {

    const [showToS, setShowToS] = useState(false)

    return(
        
        <div className = 'register'>

            {showToS &&
            <ToS /> }

            <Welcome />

            <div className = 'register-main'>

            <p className = 'page-title'>Create New Account</p>

                <form className = 'reg-form'

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