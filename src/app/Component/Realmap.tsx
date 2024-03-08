'use client'

import dynamic from "next/dynamic"

const MapBase = dynamic(
    async() => await import ('./Base'),
    {
        loading: () => <p>Loading Map...</p>,
        ssr: false
    }
)

function Realmap() {
    const center = [78.9629, 20.5937];
    const zoom = 7;

    return (
        <MapBase center={center} zoom={zoom}></MapBase>
    )
}


export default Realmap;