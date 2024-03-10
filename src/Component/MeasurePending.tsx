// "use client"

// import React, { useEffect, useRef, useState } from 'react';
// import Map from 'ol/Map';
// import View from 'ol/View';
// import Overlay from 'ol/Overlay';
// import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
// import { LineString, Polygon } from 'ol/geom';
// import { OSM, Vector as VectorSource } from 'ol/source';
// import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
// import { Draw } from 'ol/interaction';
// import { getArea, getLength } from 'ol/sphere';
// import { unByKey } from 'ol/Observable';

// import 'ol/ol.css'; // Import OpenLayers CSS


// // use reference== https://openlayers.org/en/latest/examples/measure.html
// function MeasureFeature() {
//   const mapRef = useRef(null);
//   const [measureTooltipElement, setMeasureTooltipElement] = useState(null);
//   const [measureTooltip, setMeasureTooltip] = useState(null);

//   useEffect(() => {
//     const raster = new TileLayer({
//       source: new OSM(),
//     });

//     const source = new VectorSource();

//     const vector = new VectorLayer({
//       source: source,
//       style: new Style({
//         fill: new Fill({
//           color: 'rgba(255, 255, 255, 0.2)',
//         }),
//         stroke: new Stroke({
//           color: '#ffcc33',
//           width: 2,
//         }),
//         image: new CircleStyle({
//           radius: 7,
//           stroke: new Stroke({
//             color: 'rgba(0, 0, 0, 0.7)',
//           }),
//           fill: new Fill({
//             color: 'rgba(255, 255, 255, 0.2)',
//           }),
//         }),
//       }),
//     });

//     const map = new Map({
//       layers: [raster, vector],
//       target: mapRef.current,
//       view: new View({
//         center: [-11000000, 4600000],
//         zoom: 15,
//       }),
//     });

//     const measureTooltipElement = document.createElement('div');
//     measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
//     const measureTooltip = new Overlay({
//       element: measureTooltipElement,
//       offset: [0, -15],
//       positioning: 'bottom-center',
//       stopEvent: false,
//       insertFirst: false,
//     });
//     map.addOverlay(measureTooltip);
//     setMeasureTooltipElement(measureTooltipElement);
//     setMeasureTooltip(measureTooltip);

//     let draw;

//     function addInteraction() {
//       draw = new Draw({
//         source: source,
//         type: 'LineString',
//         style: new Style({
//           fill: new Fill({
//             color: 'rgba(255, 255, 255, 0.2)',
//           }),
//           stroke: new Stroke({
//             color: 'rgba(0, 0, 0, 0.5)',
//             lineDash: [10, 10],
//             width: 2,
//           }),
//           image: new CircleStyle({
//             radius: 5,
//             stroke: new Stroke({
//               color: 'rgba(0, 0, 0, 0.7)',
//             }),
//             fill: new Fill({
//               color: 'rgba(255, 255, 255, 0.2)',
//             }),
//           }),
//         }),
//       });
//       map.addInteraction(draw);

//       draw.on('drawstart', function (evt) {
//         sketch = evt.feature;

//         let tooltipCoord = evt.coordinate;

//         let listener;
//         sketch.getGeometry().on('change', function (evt) {
//           const geom = evt.target;
//           let output;
//           if (geom instanceof Polygon) {
//             output = formatArea(geom);
//             tooltipCoord = geom.getInteriorPoint().getCoordinates();
//           } else if (geom instanceof LineString) {
//             output = formatLength(geom);
//             tooltipCoord = geom.getLastCoordinate();
//           }
//           measureTooltipElement.innerHTML = output;
//           measureTooltip.setPosition(tooltipCoord);
//         });

//         draw.on('drawend', function () {
//           measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
//           measureTooltip.setOffset([0, -7]);
//           sketch = null;
//           measureTooltipElement = null;
//           createMeasureTooltip();
//           unByKey(listener);
//         });
//       });
//     }

//     map.on('pointermove', function (evt) {
//       if (evt.dragging) {
//         return;
//       }
//       let helpMsg = 'Click to start drawing';

//       helpTooltipElement.innerHTML = helpMsg;
//       helpTooltip.setPosition(evt.coordinate);

//       helpTooltipElement.classList.remove('hidden');
//     });

//     map.getViewport().addEventListener('mouseout', function () {
//       helpTooltipElement.classList.add('hidden');
//     });

//     addInteraction();

//     return () => {
//       map.setTarget(null);
//     };
//   }, []);

//   return <div id="map" className="map" ref={mapRef} style={{ width: '100%', height: '400px' }}></div>;
// }

// export default MeasureFeature;
