import React, { useState } from 'react'
import './index.css'
import Loading from './Loading'
import Header from './Header'
import Feed from './Feed'
import Footer from './Footer'

export default function App() {

  const [data, setData] = useState()

  setTimeout( () => setData('sdasd'), 2000)

  return (

    <div className="App">

      {/* <Loading fade = {data ? 'fade' : ''} /> */}

      {/* {data && <> */}

        <Header />

        <Feed />

        <Footer />

        {/* </> } */}

    </div>
  )
}