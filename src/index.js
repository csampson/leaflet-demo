import Leaflet from 'leaflet';

if (module.hot) {
  module.hot.accept();
}

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
const map = Leaflet.map('map').setView([29.951065, -90.071533], 13);

Leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: MAPBOX_TOKEN
}).addTo(map);

