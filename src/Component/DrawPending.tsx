"use client"

import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import { Draw, Modify, Snap } from 'ol/interaction';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { get as getProjection } from 'ol/proj';



// use refernce == https://openlayers.org/en/latest/examples/draw-and-modify-features.html
function DrawFeature() {
  const mapRef = useRef(null);

  useEffect(() => {
    const raster = new TileLayer({
      source: new OSM(),
    });

    const source = new VectorSource();
    const vector = new VectorLayer({
                
      source: source,
      style: {
        fill: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
        stroke: {
          color: '#ffcc33',
          width: 2,
        },
        image: {
          circle: {
            radius: 7,
            fill: {
              color: '#ffcc33',
            },
          },
        },
      },
    });

    const extent = getProjection('EPSG:3857').getExtent().slice();
    extent[0] += extent[0];
    extent[2] += extent[2];

    const map = new Map({
      layers: [raster, vector],
      target: mapRef.current,
      view: new View({
        center: [-11000000, 4600000],
        zoom: 4,
        extent,
      }),
    });

    const modify = new Modify({ source: source });
    map.addInteraction(modify);

    let draw, snap;

    const addInteractions = () => {
      draw = new Draw({
        source: source,
        type: 'Point', // Initial value, can be changed dynamically
      });
      map.addInteraction(draw);
      snap = new Snap({ source: source });
      map.addInteraction(snap);
    };

    const typeSelect = 'Point'; // Initial value, can be changed dynamically

    addInteractions();

    return () => {
      map.setTarget(null);
      typeSelect.removeEventListener('change', handleChange);
    };
  }, []);

  return (
  <>
  <div ref={mapRef} style={{ width: '100%', height: '400px' }}/>

  
  </>
  );
}

export default DrawFeature;
