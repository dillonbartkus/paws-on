import React, { useState, useEffect } from 'react'
import './index.css'
import axios from 'axios'
import Main from './Main'
import SERVERURL from './config'

export default function App() {

  const [error, setError] = useState(false)
  const [feedData, setFeedData] = useState()  

  useEffect( () => {
    fetchFeedData()
  }, [])

  const fetchFeedData = async () => {
    try {      
      const res = await axios.post(`${SERVERURL}/feed`) 
      setFeedData(res.data.data)
    }
    catch(err) {
      console.log(err.message)
      setError(true)
    }
  }  
  
  // if(error) return <p>Error. Please refresh.</p>

  return(

  <div className = 'App'>

    <Main feedData = {feedData} />

  </div>

  )

}