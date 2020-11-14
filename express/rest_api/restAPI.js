const fetch = require("node-fetch");
const fs = require("fs");
const mysql = require("mysql");
const fastcsv = require("fast-csv");

fetch('https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv')
  .then(response => response.text())
  .then(text => {
    //console.log(text)
    
    //let stream = fs.createReadStream(text);
    console.log("After readstream");
    let csvData = text;
    let csvStream = fastcsv
      .parse()
      .on("data", function(data) {
        csvData.push(data);
      })
      .on("end", function() {
        // remove the first line: header
        csvData.shift();
    
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
            let query =
              "INSERT INTO us (date, cases, deaths) VALUES ?";
            connection.query(query, [csvData], (error, response) => {
              console.log(error || response);
            });
          }
        });
      });
    
    //stream.pipe(csvStream);
  
  
  }); //end of fetch

  
  