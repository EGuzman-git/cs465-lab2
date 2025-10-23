    /* CS465 Lab2 Javascript React file */
import { useEffect, useState, useRef } from "react"
import { jsx } from "react/jsx-runtime";

export function App() {
  const [poiList,setpoi] = useState([]);
  const [showList,setShowList] = useState(true);
  const [resetMap,setResetMap] = useState(0);
  function addMarker(newMarker) {
    setpoi(newMarker)
  }
  function doneAdding() {
    setShowList(false);
  }
  function resetMapButton() {
    setpoi([]);
    setShowList(true);
  }

  return (
    <div>
      {showList ? 
        <ul>
          <h1>Click on the map to add a point of interest</h1>
          {poiList}
          <button onClick={doneAdding}>Done Adding Points</button>
        </ul>
      :
      ""
      }
      <Map addMarkerFromMap={addMarker} allowMoreMarkers={showList} resetMap={resetMapButton}/>
      <button onClick={resetMapButton}>Reset</button>
    </div>
  )
}



export function Map({addMarkerFromMap,allowMoreMarkers,resetMap}) {

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

      //if allowMoreMarkers is false do not allow any more markers
      if (!allowMoreMarkers){
        return;
      }

      popup
          .setLatLng(e.latlng)
          .setContent("The coordinates you clicked are " + e.latlng.toString())
          .openOn(map);
      var description = prompt("Enter Description:");
      var marker = L.marker(e.latlng, {title:description}).addTo(map);
      markerList.push(marker);
      var formattedMarkerList = markerList.map((point, index) => {
        return <li key={index}>"{point.options.title}" @ {marker._latlng.toString()} </li>
      });
      
      addMarkerFromMap(formattedMarkerList);
    }

    map.on('click', onMapClick);

    // Function that gets called when component goes away(Part of useEffect())
    return () => {
      map.remove();
      markerList = [];
  	};
  }, [App ]);
  
  return <div id="map"></div>
}


