//THIS WORKS
//READS FROM GITHUB CSV AND STORES INTO MYSQL DATABASE

const fetch = require("node-fetch");
const mysql = require("mysql");

fetch('https://raw.githubusercontent.com/nytimes/covid-19-data/master/us.csv')
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

            query = "DROP TABLE if exists us;";
              connection.query(query, (error, response) => {
                console.log(error, response);
              });

            query = " create table us ( date varchar(255),cases int,deaths int,primary key (date));";
              connection.query(query, (error, response) => {
                console.log(error, response);
              });


            query = "INSERT INTO us(date, cases, deaths) VALUES ?";
            connection.query(query, [newArr], (error, response) => {
              console.log(error, response);
            });
            connection.end();
          }
        });
      });
    
    //stream.pipe(csvStream);
  
  
  //end of fetch

  
  