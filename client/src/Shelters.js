import React, { useState } from 'react'
import config from './config'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default function() {

    const [zip, setZip] = useState('')
    const [shelters, setShelters] = useState([])
    const [redirectToHome, setRedirectToHome] = useState(false)

    const fetchShelters = async e => {
        e.preventDefault()
        const res = await axios.get(`https://cors-anywhere.herokuapp.com/http://api.petfinder.com/shelter.find?format=json&key=${config.PETKEY}&location=${zip}`)
        setShelters(res.data.petfinder.shelters.shelter)
    }

    console.log(shelters)

    return(
        
        <div className = 'find-shelters'>

            <h2 className = 'lostfound'>Find Shelters</h2>

            <p>Enter your zipcode to find animal shelters near you!</p>

            <form
            onSubmit = { e => fetchShelters(e) }
            >
                <input
                onChange = { e => setZip(e.target.value) }
                name = 'zip'
                maxLength = '5'
                minLength = '5'
                placeholder = 'Type your Zipcode'
                autoFocus
                required
                ></input>

                <button className = 'green-button'>Find Shelters</button>

                <p className = 'returnhome'
                    onClick = { () => setRedirectToHome(true) } >
                    Return Home</p>
            </form>

            {shelters.map( (shelter, id) => {
                return <div className = 'shelter' key = {id}>

                    <img />

                    <div className = 'shelter-info'>
                        <p>{shelter.name.$t}</p>
                        <p>{shelter.address1.$t && `${shelter.address1.$t},`} {shelter.city.$t}, {shelter.state.$t} {shelter.zip.$t} </p>
                        <p>Phone: {shelter.phone.$t ? shelter.phone.$t : 'N/A'}</p>
                        <p>Email: {shelter.email.$t ? shelter.email.$t : 'N/A'}</p>
                    </div>

                </div>
                })
            }

            {redirectToHome && 
            <Redirect push to='/' />}

        </div>
    )
}