#!/usr/bin/env node

const { response } = require("express");

function getCovidData(filter)
{
  const mysql = require("mysql");

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
    });

    return response;
}

