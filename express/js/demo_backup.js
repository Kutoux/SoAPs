
//import * as mysql from "/../../node_modules/@types/mysql/index";




//var requirejs = require("requirejs");
/*
requirejs.config({
  nodeRequire: require,
  baseUrl: ".",
  paths: {
    mysql: "mysql"
   }
});
requirejs(['foo', 'bar'],
*/




/*
// create a new connection to the database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "covid_map"
  });

  // open the connection
  connection.connect(error => {
    if (error) {
      console.error(error);
    } else {
      let query = "SELECT deaths FROM us WHERE date='2020-11-08' AND fips='" + filter + "'";
      connection.query(query, (error, response) => {
        //res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        console.log(error, response);
      });
      connection.end();
    }
  })
}
*/
/*
function updateData(filter){
  //const mysql = require("mysql");

  // create a new connection to the database
  const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "covid_map"
    });
  
    // open the connection
    connection.connect(error => {
      if (error) {
        console.error(error);
      } else {
        let query = "SELECT deaths FROM counties WHERE fips='" + filter + "' AND date = '12/7/20'";
        connection.query(query, (error, response) => {
          //res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
          console.log(error, response);
        });
        connection.end();
      }
    });
}
*/


var countiesData = 'data/counties_deaths.geojson';
var statesData = 'data/states_deaths.geojson';
var usData = 'data/us_deaths.geojson';
var geoData = 'placeholder';
var mapArr =[];
//var map = L.map('map').setView([39.9897471840457, -75.13893127441406], 4)


var map = L.map('map').setView([41.4925, -99.9018], 4)
var layerGroup = L.layerGroup().addTo(map);
// Add basemap
L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>; ©<a href="https://github.com/nytimes/covid-19-data/"> NY Times</a>;The SoAPs: Bobby King, Jennifer Nguyen, Karim Durrani, Aidan Pare, Frances Watson'
}).addTo(map)

/*
function getColor(d) {
  return d > 1000 ? '#800026' :
         d > 500  ? '#BD0026' :
         d > 200  ? '#E31A1C' :
         d > 100  ? '#FC4E2A' :
         d > 50   ? '#FD8D3C' :
         d > 20   ? '#FEB24C' :
         d > 10   ? '#FED976' :
                    '#FFEDA0';
}
*/

function mapInfo(){
// Add GeoJSON
$.getJSON(geoData, function (geojson) {
  layerGroup.clearLayers(),
  L.choropleth(geojson, {
    valueProperty: 'deaths',
    scale: ['#ffffb2', '#e31a1c'],
    steps: 6,
    mode: 'q',
    style: {
      color: '#fff',
      weight: 2,
      fillOpacity: 0.8
    },
    onEachFeature: function (feature, layer) {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
      if(geoData == countiesData){
        layer.bindPopup('<b>' + feature.properties["state_name"].toUpperCase() + '<br>' + feature.properties["County Name"].toUpperCase() + '<br>' + 'Deaths: ' + '<i>' + feature.properties["deaths"]);
      }
      else if(geoData == statesData){
        layer.bindPopup('<b>' + feature.properties["name"].toUpperCase() + '<br>' + 'Deaths: ' + '<i>' + feature.properties["deaths"]);
      }
    }
  }).addTo(layerGroup)
})
}

//For hover
function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
  }
  info.update(layer.feature.properties);
}

function resetHighlight(e) {
  L.layerGroup.resetStyle(e.target);
  info.update();
}

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}



//For custom info

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
  if(geoData == statesData){
    this._div.innerHTML = '<h4>State Deaths</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.deaths + ' deaths'
        : 'Hover over a state');
    }
    else if(geoData == countiesData)
    {
      this._div.innerHTML = '<h4>County Deaths</h4>' +  (props ?
        '<b>' + props["state_name"] + '</b><br />' + props["County Name"] + '</b><br />' + props.deaths + ' deaths'
        : 'Hover over a state');
    }
    else if(geoData == 'placeholder')
    {
      this._div.innerHTML = '<h4>Click on View States Data<br>or View County Data</br></h4>' +  (props ?
        '<b>' + props["state_name"] + '</b><br />' + props["County Name"] + '</b><br />' + props.deaths + ' deaths'
        : 'Then hover over a state or county');
    }
};

info.addTo(map);


var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 100, 500, 1000, 5000],
        labels = [],
        colors = ['#FFFFB2', '#F9D194', '#EE7658', '#E9483A', '#E31A1C'];

        /*
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + (colors[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
*/

// loop through our density intervals and generate a label with a colored square for each interval
for (var i = 0; i < grades.length; i++) {
  div.innerHTML +=
      '<i style="background:' + (colors[i]) + '"></i> ' +
      grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
}

   

    return div;
};

legend.addTo(map);


/*
function style(feature) {
  return {
      fillColor: getColor(feature.properties.deaths),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.8
  };
}
*/


/*
$('#header').function(){

}
*/
//$(":button").css("background-color", "red");
$('#button1').click(function (){
  console.log("button1");
  //clearLayers();
  geoData = statesData;
  mapInfo();
 });

 $('#button2').click(function (){
  console.log("button2");
  //map.clearLayers();
  geoData = countiesData;
  mapInfo();
 });
 
 

 /*
var element = document.getElementById('button1');
element.onclick = function () {
  
};
*/
/*
$.updateData({ url: 'get.php',
         data: {'fips':feature.properties["countyFIPS"]},
         type: 'post',
         dataType:'json'
        });
        */

/*var text = localStorage.getItem(usData);*/
/*var obj = JSON.parse(text);*/

  $.get(usData).done( function(data){
      $('#cases').html(JSON.stringify(data.features[0].properties.cases));
 });

 $.get(usData).done( function(data){
  $('#deaths').html(JSON.stringify(data.features[0].properties.deaths));
});

$.get(usData).done( function(data){
  $('#date').html(JSON.stringify(data.features[0].properties.date));
});