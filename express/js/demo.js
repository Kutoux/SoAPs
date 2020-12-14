
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


function getColorStates(d) {
  return d > 10000  ? '#bd0026' :
         d > 5000   ? '#f03b20' :
         d > 1000   ? '#fd8d3c' :
         d > 100   ?  '#fecc5c' :
                      '#ffffb2';
}

function getColorCounties(d) {
  return d > 500  ? '#bd0026' :
         d > 100   ? '#f03b20' :
         d > 50   ? '#fd8d3c' :
         d > 10   ?  '#fecc5c' :
                      '#ffffb2';
}


function statesInfo(){
// Add GeoJSON

$.getJSON(geoData, function (geojson) {
  var geojsonLayer = new L.GeoJSON(geojson, 
    {
    style: function (feature) {
        return {
          fillColor: getColorStates(feature.properties.deaths),
          weight: 2,
          opacity: 1,
          color: 'white',
          fillOpacity: 0.7
        }
    },
    onEachFeature: function (feature, layer) {
        layer.on('mouseover', function (e) {
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
        });
        layer.on('mouseout', function () {
            geojsonLayer.resetStyle(this);
            info.update();
        });
    }
}).addTo(layerGroup)
})
}

function countiesInfo(){
  // Add GeoJSON
  $.getJSON(geoData, function (geojson) {
    var geojsonLayer = new L.GeoJSON(geojson, 
      {
      style: function (feature) {
          return {
            fillColor: getColorCounties(feature.properties.deaths),
            weight: 2,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.7
          }
      },
      onEachFeature: function (feature, layer) {
          layer.on('mouseover', function (e) {
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
          });
          layer.on('mouseout', function () {
              geojsonLayer.resetStyle(this);
              info.update();
          });
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
  resetStyle(e.target);
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

//INFO CARD TEXT HERE PLS
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

  if(geoData == statesData){
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 100, 1000, 5000, 10000],
        labels = [],
        colors = ['#ffffb2', '#fecc5c', '#fd8d3c', '#f03b20', '#bd0026'];

  
//LEGEND TEXT RIGHT HERE PLS
// loop through our density intervals and generate a label with a colored square for each interval
for (var i = 0; i < grades.length; i++) {
  div.innerHTML +=
  '<i style="background:' + colors[i] + '"></i> ' +
  grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
}
  }


  else if(geoData == countiesData){
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 50, 100, 500],
        labels = [],
        colors = ['#ffffb2', '#fecc5c', '#fd8d3c', '#f03b20', '#bd0026'];

  
//LEGEND TEXT RIGHT HERE PLS
// loop through our density intervals and generate a label with a colored square for each interval
for (var i = 0; i < grades.length; i++) {
  div.innerHTML +=
  '<i style="background:' + colors[i] + '"></i> ' +
  grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
}
  }
   

    return div;
};

//legend.addTo(map);


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
  //layerGroup.clearLayers(),
  geoData = statesData;
  layerGroup.clearLayers();
  statesInfo();
  legend.addTo(map);
 });

 $('#button2').click(function (){
  console.log("button2");
  //layerGroup.clearLayers(),
  geoData = countiesData;
  layerGroup.clearLayers();
  countiesInfo();
  legend.addTo(map);
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