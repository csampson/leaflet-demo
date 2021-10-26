import Leaflet from 'leaflet';
import stations from './stations.json';

const NOLA_COORDS = [29.951065, -90.071533];
const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

const map = Leaflet.map('map').setView(NOLA_COORDS, 10);

const OSD = {
  canvas: document.querySelector('#osd'),
  template:  document.querySelector('#osd-content'),
  update (station) {
    const clone = this.template.content.cloneNode(true);
    clone.querySelector('h1').textContent = `${station.callsign} ${station.frequency}`;
    clone.querySelector('p').textContent = `${station.market_city}, LA`;
    this.canvas.replaceChildren(clone);
  }
};

const Player = {
  element: document.querySelector('audio'),
  play (station) {
    OSD.update(station);
    this.element.pause();
    this.element.src = station.stream_url;
    this.element.play();
  }
};

Leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: MAPBOX_TOKEN
}).addTo(map);

stations.forEach(station => {
  const marker = Leaflet.circleMarker(station.geolocation, {
    fillColor: '#03a9f4',
    fillOpacity: 0.5,
    radius: 10
  }).addTo(map);

  marker.bindTooltip(`${station.callsign} ${station.frequency}`);
  marker.on('click', () => Player.play(station));
});
