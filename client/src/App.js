import React, { useState, useEffect } from 'react'
import './index.css'
import axios from 'axios'
import Loading from './Loading'
import Main from './Main'

export default function App() {

  const [loading, setLoading] = useState(true)
  const [feedData, setFeedData] = useState()

  useEffect( () => {
    fetchFeedData()
  }, [])

  const fetchFeedData = async () => {
    try {
      const res = await axios.post(`/feed`)      
      setFeedData(res.data.data)
      setLoading(false)
    }
    catch(err) {
      console.log(err.message)
      window.location.reload()
    }
  }
  
  return (

    <div className = 'App'>

      { loading && <Loading /> }

      { !loading && <Main feedData = {feedData} /> }

    </div>
  )
}