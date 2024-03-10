import React from 'react'
import "../app/globals.css"

const Feature = () => {
  return (
    <header className=''>
        <p className="headmap">Explore the MAP</p>
      <span className='subheadmap'>Features</span>
    <ul className='list'>
        <li>You can Freely explore the map with zoom and zoom out </li>
        <li>Users are allowed to locate a pinpoint on the map, Deafault marker is at Pune (73.8567, 18.5204)</li>
        <li>functionality to draw a polygon, point, and line on the map</li>        
    </ul>    
    
    </header>
  )
}

export default Feature