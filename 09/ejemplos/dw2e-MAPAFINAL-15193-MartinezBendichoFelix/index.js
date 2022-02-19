// config map
let config = {
	minZoom: 2,
	maxZoom: 18,
};
// magnification with which the map will start
const zoom = 6;
// co-ordinates
const lat = -3.725759983062744;
const lng = 40.440039352146236;

// calling map
const map = L.map("map", config).setView([lat, lng], zoom);

// Used to load and display tile layers on the map
// Most tile servers require attribution, which you can set under `Layer`
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	attribution:
		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

function onEachFeature(feature, layer) {
	layer.bindPopup(feature.properties.nazwa);
}
2
// Adding Geo JSON data to the map
L.geoJSON(jsonData, {
	onEachFeature: function (feature, layer) {
		let nombreFacultad = 'Facultad de: ' + feature.properties.name.replace('_', ' ').toUpperCase();
		layer.bindPopup(`<img src="./images/${feature.properties.image}.jpg" alt="${nombreFacultad}" class="imagen-facultad"> <p>${nombreFacultad}</p>`);
	}
}).addTo(map);