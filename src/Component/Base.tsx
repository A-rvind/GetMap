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



const Base = (props, {children}) => {
    const { center, zoom } = props;
    const mapElement = useRef(null);

    const baseLayer = new TileLayer (
        { source: new XYZ ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            crossOrigin: 'anonymous',
        })
    });
    



    useEffect(() => {
        const initialmap = new Map({
          target: mapElement.current,
          layers: [
            baseLayer
          ],
          view: new View({
            center: fromLonLat(center),
            zoom: (zoom)
          })
        });
        
        const layer =new VectorLayer({
          source: new VectorSource({
            features:[
              new Feature({
                geometry: new Point (fromLonLat([73.8567, 18.5204]))
              })
            ]
          })
        })



        initialmap.addLayer(layer);
        initialmap.updateSize();

        return() => initialmap.setTarget(null)

      }, []);
      //new
      
      
     
      return (
        <>
        <div id="map" ref={mapElement}> {children} </div>
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