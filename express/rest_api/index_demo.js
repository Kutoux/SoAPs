
//WORKING
//READS FROM MYSQL DATABASE TO SITE
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
  password: 'root',
  database: 'covid_map'
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});
 

//show all products
app.get('/api/covid',(req, res) => {
  let sql = "SELECT deaths FROM us WHERE date='2020-11-08'";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    //JSON.stringify({"status": 200, "error": null, "response": results})
    res.send(results[0]);
    console.log(results[0].deaths);
  });
});
 /*
//show single product
app.get('/api/covid/:id',(req, res) => {
  let sql = "SELECT * FROM us WHERE id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 */
//add new product
/*
app.post('https://raw.github.com/nytimes/covid-19-data/blob/master/us.csv',(req, res) => {
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
app.put('/api/covid/:id',(req, res) => {
  let sql = "UPDATE us SET name='"+req.body.name+"', deaths='"+req.body.deaths+"' WHERE id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
*/

/* 
//Delete product
app.delete('/api/covid/:id',(req, res) => {
  let sql = "DELETE FROM us WHERE id="+req.params.id+"";
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
