import React from 'react'
import logo from './images/splashlogo.png'

export default function({ fade }){

    return(

        <div className = {`loading ${fade}`}>
            <img src = {logo} alt = 'loading logo' />
        </div>

    )
}