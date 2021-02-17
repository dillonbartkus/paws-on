import React, { useEffect } from 'react'
import { MAPTOKEN } from './config'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'

export default function Map({ coords }) {

    useEffect(() => {
        const renderMap = () => {
            if (coords.lat && coords.long) {

                const mapDiv = document.querySelector('.map')
                mapboxgl.accessToken = MAPTOKEN

                const map = new mapboxgl.Map({
                    container: mapDiv,
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: [coords.long, coords.lat],
                    zoom: 12
                })

                map.addControl(new mapboxgl.NavigationControl())

                map.on('load', function () {  // add cat icon
                    map.loadImage('https://i.imgur.com/gIjsU00.png', function (error, image) {
                        if (error) throw error;
                        map.addImage('cat', image);
                        map.addLayer({
                            "id": "points",
                            "type": "symbol",
                            "source": {
                                "type": "geojson",
                                "data": {
                                    "type": "FeatureCollection",
                                    "features": [{
                                        "type": "Feature",
                                        "geometry": {
                                            "type": "Point",
                                            "coordinates": [coords.long, coords.lat]
                                        }
                                    }]
                                }
                            },
                            "layout": {
                                "icon-image": "cat",
                                "icon-size": 0.1
                            }
                        })
                    })
                })
            }
        }
        renderMap()
    }, [coords])

    return (

        <div className='map'> </div>
    )
}