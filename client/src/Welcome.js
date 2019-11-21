import React from 'react'
import logo from './images/pawslogo.svg'
import text from './images/pawson.svg'
import med from './images/paws-bg-med.svg'
import small from './images/paws-bg-small.svg'
import corner from './images/paws-bg-corner.svg'

export default function() {

    return(
        <div className = 'welcome'>

            <div>

                <img className = 'welcome-logo' src = {logo} alt = '' />

                <img src = {text} alt = '' />

                <p>Welcome! Time to put our paws together!</p>

            </div>

            <img className = 'bg-small' src = {small} alt = '' />
            <img className = 'bg-small' src = {small} alt = '' />
            <img className = 'bg-med' src = {med} alt = '' />
            <img className = 'bg-med' src = {med} alt = '' />
            <img className = 'bgpaw-corner' src = {corner} alt = '' />

        </div>

    )
}