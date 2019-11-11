import React from 'react'
import logo from './images/pawslogo.png'
import text from './images/pawson.png'
import med from './images/paws-bg-med.png'
import small from './images/paws-bg-small.png'
import corner from './images/paws-bg-corner.png'

export default function() {

    const generateRandomPosition = () => {
        const randomTop = Math.random() * window.innerHeight - 90 + "px";        
        const randomLeft = Math.random() * (window.innerWidth / 2 - 90) + "px";           
    
        return {
            top : randomTop,
            left : randomLeft
        }
    }    

    return(
        <div className = 'welcome'>

            <div>

                <img className = 'welcome-logo' src = {logo} alt = '' />

                <img src = {text} alt = '' />

                <p>Welcome! Time to put our paws together!</p>

            </div>

            <img style = {generateRandomPosition()} src = {small} alt = '' />
            <img style = {generateRandomPosition()} src = {small} alt = '' />
            <img style = {generateRandomPosition()} src = {med} alt = '' />
            <img style = {generateRandomPosition()} src = {med} alt = '' />
            <img className = 'bgpaw-corner' src = {corner} alt = '' />

        </div>

    )
}