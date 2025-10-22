/* CS465 Lab2 Javascript file */

var list = [];
var map = L.map('map').setView([43.0382166,-71.4519303], 14); //Set map starting view point and zoom level


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
    list.push(marker);
    console.log (list);
}
map.on('click', onMapClick);