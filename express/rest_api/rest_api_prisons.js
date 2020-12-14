#!/usr/bin/env node
//THIS WORKS
//READS FROM GITHUB CSV AND STORES INTO MYSQL DATABASE

const fetch = require("node-fetch");
const mysql = require("mysql");

fetch('https://raw.githubusercontent.com/themarshallproject/COVID_prison_data/master/data/covid_prison_cases.csv')
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
        //arr.push(curr.split(","));
        
        var temp = [];
        temp = curr.split(",");
        temp = temp.slice(0,13);
        if(temp.length == 13){
          arr.push(temp);
        }
        return arr;
        
    }, array);
   
        newArr.shift();
        newArr.pop();
    
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
            
            let query = "use covid_map;";
              connection.query(query, (error, response) => {
                console.log(error, response);
              });

              query = "set sql_safe_updates = 0;";
              connection.query(query, (error, response) => {
                console.log(error, response);
              });

            query = "DROP TABLE if exists prisons;";
              connection.query(query, (error, response) => {
                console.log(error, response);
              });

            query = "create table prisons(name varchar(255),abbreviation varchar(255),staff_tests varchar(255),staff_tests_with_multiples varchar(255),prisoner_tests varchar(255),prisoner_tests_with_multiples varchar(255),total_staff_cases varchar(255),total_prisoner_cases varchar(255),staff_recovered varchar(255),prisoners_recovered varchar(255),total_staff_deaths varchar(255),total_prisoner_deaths varchar(255),as_of_date varchar(255));";
              connection.query(query, (error, response) => {
                console.log(error, response);
              });

            query =
              "INSERT INTO prisons(name,abbreviation,staff_tests,staff_tests_with_multiples,prisoner_tests,prisoner_tests_with_multiples,total_staff_cases,total_prisoner_cases,staff_recovered,prisoners_recovered,total_staff_deaths,total_prisoner_deaths,as_of_date) VALUES ?";
            connection.query(query, [newArr], (error, response) => {
              console.log(error, response);
            });
            connection.end();
          }
        });
      });
    
    //stream.pipe(csvStream);
  
  
  //end of fetch

  
  