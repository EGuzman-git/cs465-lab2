    /* CS465 Lab2 Javascript React file */
import { useEffect, useState } from "react"
import { jsx } from "react/jsx-runtime";

export function App() {
  const [poi,setpoi] = useState([]);
  const [prompt,setprompt] = useState("Click on the map to add a point of interest");
  function addMarker(newMarker) {
    setpoi(newMarker)
  }

  return (<div>
  <ul><h1>{prompt}</h1>{poi}</ul>
      <Map addMarkerFromMap={addMarker} />
      </div>

  );
}


export function Map({addMarkerFromMap}) {

  useEffect(() => {

    var map = L.map('map').setView([43.0382166,-71.4519303], 14); //Set map starting view point and zoom level
    var markerList = [];

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var popup = L.popup();

    //Map click response functionality
    function onMapClick(e){
        popup
            .setLatLng(e.latlng)
            .setContent("The coordinates you clicked are " + e.latlng.toString())
            .openOn(map);
        var description = prompt("Enter Description:");
        var marker = L.marker(e.latlng, {title:description}).addTo(map);
        markerList.push(marker);
        var formattedMarkerList = markerList.map(point => {
          return <li>{point.options.title}</li>
        });
        
        addMarkerFromMap(formattedMarkerList);
    }

    map.on('click', onMapClick);

    return () => {
      map.remove();
  	};
  }, [App]);
  
  return <div id="map"></div>
}


