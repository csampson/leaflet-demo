import Leaflet from 'leaflet';
import stations from './stations.json';

const NOLA_COORDS = [29.951065, -90.071533];
const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

const map = Leaflet.map('map').setView(NOLA_COORDS, 10);

Leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: MAPBOX_TOKEN
}).addTo(map);

stations.forEach(station => {
  Leaflet.circleMarker(station.geolocation, {
    fillColor: '#03a9f4',
    fillOpacity: 1,
    radius: 5
  }).addTo(map);    
});
