import React from 'react'
import test from './images/pic.png'

export default function() {

    return(

        <div className = 'feed'>

            <p>Welcome! Here is a list of Lost and Found Cats. Would you like to post a lost or found cat? Create an account to share your post with everyone!</p>

            <h2>Lost and Found Cats Posted</h2>
            
            <div className = 'post'>

                <img src = {test} alt = '' />

            </div>

        </div>
    )
}