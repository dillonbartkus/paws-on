import React, {useState, useEffect} from 'react'
import './carousel.css'
import axios from 'axios'
import Map from './Map'
import config from './config'
import Flickity from 'react-flickity-component'
import left from './images/paws-bg-left.svg'
import right from './images/paws-bg-right.svg'
import med from './images/paws-bg-med.svg'
import { Redirect } from 'react-router-dom'

export default function(props) {

    const [post, setPost] = useState()
    const [coords, setCoords] = useState({
        lat: null,
        long: null
    })
    const [error, setError] = useState(false)
    const [redirectToNewPost, setRedirectToNewPost] = useState(false)
    const [redirectToHome, setRedirectToHome] = useState(false)

    useEffect( () => {
        const fetchPost = async () => {
            try {
                const res = await axios.post(`http://localhost:8080/post/${props.location.state.id}`)
                setPost(res.data.data)
            }
            catch(err) {
                console.log(err)
                setError(true)
            }
        }
        fetchPost()
    }, [props.location.state.id])

    useEffect( () => {
        const fetchCoords = async () => {
            if(post) {
                const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${post.address}&key=${config.MAPKEY}`)
                setCoords({
                    lat: res.data.results[0].geometry.location.lat,
                    long: res.data.results[0].geometry.location.lng
            })
        }}
        fetchCoords()
    }, [post])

    const flickityOptions = {
        contain: true,
        lazyLoad: true,
        wrapAround: true,
        autoPlay: 4000,
        pauseAutoPlayOnHover: false
    }

    if(error) return <p className = 'error'>Error loading post.</p>
    
    return(
        
        <div className = 'postdetails'>

            <img className = 'bg-right' src = {right} alt = '' />
            <img className = 'bg-left' src = {left} alt = '' />
            <img className = 'bg-med' src = {med} alt = '' />

            {localStorage.pawsId && <button
            onClick = { () => setRedirectToNewPost(true) }
            className = 'blue-button'>Create Post</button> }

            <h2 className = 'lostfound'>Lost and Found Cats Posted</h2>

            {post &&
            <div className = 'single-post'>

                <div className = 'pictures'>
                    {post.picture_two &&
                        <Flickity
                            className={'carousel'} // default ''
                            elementType={'div'} // default 'div'
                            options={flickityOptions} // takes flickity options {}
                            disableImagesLoaded={false} // default false
                            reloadOnUpdate={false} // default false
                            static // default false
                        >
                            <img src={post.picture_one} alt = '' />
                            <img src={post.picture_two} alt = '' />
                            {post.picture_three && <img src={post.picture_three} alt = '' /> }
                        </Flickity> }
                    {!post.picture_two && !post.picture_three &&
                        <img src = {post.picture_one} alt = '' /> }
                </div>

                <Map coords = {coords} />

                <div className = 'single-post-content'>

                    <p className = 'post-title'>{post.title}</p>

                    <p className = 'posted-by'>Posted by <span>{post.name}</span></p>

                    <p className = 'post-subheader'>Description</p>
                    <p className = 'post-desc'>{post.description}</p>

                    <p className = 'post-subheader'>Address</p>
                    <p className = 'post-desc'>{post.address}</p>

                    <div className = 'home-contact'>
                        <p className = 'returnhome'
                        onClick = { () => setRedirectToHome(true) } >
                        Return Home</p>

                        <button
                        onClick = { e => {
                            e.stopPropagation()
                            window.location.href = `mailto:${post.email}`
                        }}
                        className = 'green-button'>Contact</button>
                    </div>

                </div>

            </div> }

            {redirectToHome && 
            <Redirect push to='/' />}

            {redirectToNewPost && 
            <Redirect push to='/newpost' />}

        </div>
    )
}