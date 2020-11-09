/*const express = require('express'),
  app = express(),
  mysql = require('mysql'),
  cors = require('cors'),
  bodyParser = require('body-parser');


  db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Adamantoise3141!',
    database: 'covid_map'
  })

// make server object that contain port property and the value for our server.
var server = {
  port: 4040
};

// use the modules
app.use(cors())
app.use(bodyParser.json());

// starting the server
app.listen( server.port , () => console.log(`Server started, listening port: ${server.port}`));*/


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const { Router } = require('express');
 
// parse application/json
app.use(cors())
app.use(bodyParser.json());
/*
Router.post('/csv', 'https://github.com/nytimes/covid-19-data/blob/master/us.csv', function(req,res){
  console.log(req.body)
  res.send('/dashboard');
});*/
 
//create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Adamantoise3141!',
  database: 'covid_map'
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});
 

//show all products
app.get('/api/covid',(req, res) => {
  let sql = "SELECT * FROM us";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    //console.log(results);
  });
});
 /*
//show single product
app.get('/api/products/:id',(req, res) => {
  let sql = "SELECT * FROM product WHERE product_id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 */
//add new product
/*
app.post('/api/covid',(req, res) => {
  let data = [req.body.date, req.body.cases, req.body.deaths]
  let sql = "INSERT INTO us";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
*/
 /*
//update product
app.put('/api/products/:id',(req, res) => {
let data = {product_name: req.body.product_name, product_price: req.body.product_price};  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
*/

/* 
//Delete product
app.delete('/api/products/:id',(req, res) => {
  let sql = "DELETE FROM product WHERE product_id="+req.params.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 */

//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});
