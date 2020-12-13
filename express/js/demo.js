
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
var geoData = countiesData;
var mapArr =[];
//var map = L.map('map').setView([39.9897471840457, -75.13893127441406], 4)


var map = L.map('map').setView([41.4925, -99.9018], 4)
var layerGroup = L.layerGroup().addTo(map);
// Add basemap
L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

function mapInfo(){
// Add GeoJSON
$.getJSON(geoData, function (geojson) {
  layerGroup.clearLayers(),
  L.choropleth(geojson, {
    valueProperty: 'deaths',
    scale: ['white', 'red'],
    steps: 5,
    mode: 'q',
    style: {
      color: '#fff',
      weight: 2,
      fillOpacity: 0.8
    },
    onEachFeature: function (feature, layer) {
      if(geoData == countiesData){
        layer.bindPopup('<b>' + feature.properties["state_name"].toUpperCase() + '<br>' + feature.properties["County Name"].toUpperCase() + '<br>' + 'Deaths: ' + '<i>' + feature.properties["deaths"])
      }
      else if(geoData == statesData){
        layer.bindPopup('<b>' + feature.properties["name"].toUpperCase() + '<br>' + 'Deaths: ' + '<i>' + feature.properties["deaths"])
      }
    }
  }).addTo(layerGroup)
})
}

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