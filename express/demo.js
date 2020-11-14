
var map = L.map('map').setView([39.9897471840457, -75.13893127441406], 11)

// Add basemap
L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

// Add GeoJSON
$.getJSON('data/usafacts_deaths_11.09.geojson', function (geojson) {
  L.choropleth(geojson, {
    valueProperty: '11\/8\/20',
    scale: ['white', 'red'],
    steps: 5,
    mode: 'q',
    style: {
      color: '#fff',
      weight: 2,
      fillOpacity: 0.8
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup('<b>' + feature.properties["County Name"].toUpperCase() + '<br>' + 'Deaths: ' + '<i>' + feature.properties["11\/8\/20"])
    }
  }).addTo(map)
})