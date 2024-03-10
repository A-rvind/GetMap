'use client'

import { useEffect, useRef, useState } from "react";
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from "ol/layer/Tile";
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from "ol/proj";
import 'ol/ol.css';
import { Point } from "ol/geom";
import Feature from "ol/Feature";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";



const Base = (props: { center: any; zoom: any; }, {children}: any) => { 

    const { center, zoom } = props;
    const mapElement = useRef(null); //ref is set null

    const baseLayer = new TileLayer ( //this is feature of OpenLayers
        { source: new XYZ ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            crossOrigin: 'anonymous',
        })
    });
    



    useEffect(() => {
      
        const initialmap = new Map({
          target: mapElement.current!, //current!, the ! is given for ref={mapElement} so it get mutable
          layers: [
            baseLayer
          ],
          view: new View({
            center: fromLonLat(center), //default center of the map when u visit the website, it is prop and prop value can be given in the realmap.tsx file
            zoom: (zoom) // the value can be changed in realmap.tsx file. this is prop
          })
        });
        
        //following code is for the Marker
        const layer =new VectorLayer({
          source: new VectorSource({
            features:[
              new Feature({
                geometry: new Point (fromLonLat([73.8567, 18.5204])) //The blue circle is at Pune 
              })
            ]
          })
        })



        initialmap.addLayer(layer); //new layer for the marker
        initialmap.updateSize();

        return() => initialmap.setTarget() //this is targetting to run the map

      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      
      
      
     
      return (
        <>
        <div id="map" ref={mapElement}> {children} </div> {/*The ref here is mutable as object*/}
            {/* The following code are for draw and measurement feature. which is not developed yet*/}
            <main>
              <div className='subtitle'>YET to develop</div>
        <form> 
      <label className="sublabel">Geometry type &nbsp;</label> 
      <select id="type">
        <option value="Point">Point</option>
        <option value="LineString">LineString</option>
        <option value="Polygon">Polygon</option>
        <option value="Circle">Circle</option>
      </select>
    </form>      
        <form>
      <label className="sublabel">Measurement type &nbsp;</label>
      <select id="type">
        <option value="length">Length (LineString)</option>
        <option value="area">Area (Polygon)</option>
      </select>
    </form>
    <div className="text_red">you can check the all details of draw and measure feature at github :
    
    <p>https://github.com/A-rvind/GetMap/tree/main (file name : DrawPending and MeasurePending)</p></div>
    </main>
        </>
      )
      
}
export default Base;