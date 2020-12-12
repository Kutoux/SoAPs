
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


var map = L.map('map').setView([39.9897471840457, -75.13893127441406], 11)

// Add basemap
L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

// Add GeoJSON
$.getJSON('data/counties_deaths.geojson', function (geojson) {
  L.choropleth(geojson, {
    valueProperty: 'population',
    scale: ['white', 'red'],
    steps: 5,
    mode: 'q',
    style: {
      color: '#fff',
      weight: 2,
      fillOpacity: 0.8
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup('<b>' + feature.properties["state_name"].toUpperCase() + '<br>' + feature.properties["County Name"].toUpperCase() + '<br>' + 'Deaths: ' + '<i>' + feature.properties["population"])
    }
  }).addTo(map)
})


/*
$.updateData({ url: 'get.php',
         data: {'fips':feature.properties["countyFIPS"]},
         type: 'post',
         dataType:'json'
        });
        */