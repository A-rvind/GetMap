'use client'

import dynamic from "next/dynamic"



const MapBase = dynamic(
    async() => await import ('./Base'), //this is a feature of Next.js for dynamic loading. So that the map will load async also what to give output while the map is loading
    {
        loading: () => <p>Loading Map...</p>,
        ssr: false
    }
)


function Realmap() {
    const center = [78.9629, 20.5937];  //Here you can change the location of the map
    const zoom = 7;                     //Here is control of zoom of the map

   

    
    return (
        <MapBase center={center} zoom={zoom}></MapBase>
    )
}


export default Realmap;

