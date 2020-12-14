#!/usr/bin/env node
//THIS WORKS
//READS FROM GITHUB CSV AND STORES INTO MYSQL DATABASE

const fetch = require("node-fetch");
const mysql = require("mysql");

fetch('https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv')
  .then(response => response.text())
  .then(text => {
    //console.log(text)
    var csvData = text.split("\n");
    var array = [];

    var newArr = csvData.reduce(function(arr, curr){
        /*
        if(curr.includes("date"))
        {
            return arr;
        }
        */
        //console.log(arr);
        arr.push(curr.split(","));
        return arr;
        
    }, array);
   
        newArr.shift();
    
        // create a new connection to the database
        const connection = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "root",
          database: "covid_map"
        });
    
        //Drop table and add new table, or try to just update
        
        // open the connection
        connection.connect(error => {
          if (error) {
            console.error(error);
          } else {

            let query = "use covid_map;";
              connection.query(query, (error, response) => {
                console.log(error, response);
              });

              query = "set sql_safe_updates = 0;";
              connection.query(query, (error, response) => {
                console.log(error, response);
              });

            query = "DROP TABLE if exists counties;";
              connection.query(query, (error, response) => {
                console.log(error, response);
              });

            query = "create table counties(date varchar(255),county varchar(255),state varchar(255),fips varchar(255),cases varchar(255),deaths varchar(255));";
              connection.query(query, (error, response) => {
                console.log(error, response);
              });

            query =
              "INSERT INTO counties(date, county, state, fips, cases, deaths) VALUES ?";
            connection.query(query, [newArr], (error, response) => {
              console.log(error, response);
            });
            connection.end();
          }
        });
      });
    
    //stream.pipe(csvStream);
  
  
  //end of fetch

  
  