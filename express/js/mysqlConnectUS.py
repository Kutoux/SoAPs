import mysql.connector
import geojson
import ast
from datetime import datetime, timedelta

yesterday = (datetime.now() - timedelta(1)).strftime('%Y-%m-%d')



file_us = 'express/data/us.geojson'
file_new_us = 'express/data/us_deaths.geojson'
d = {}

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="root",
  database="covid_map"
)

mycursor = mydb.cursor()

mycursor.execute("SELECT * FROM us WHERE date = '" + yesterday + "'")

myresult = mycursor.fetchall()

i = 0

d[myresult[0][0]]=myresult[0][2]
cases = myresult[0][1]

#us data
with open(file_us, 'r') as f:
    data = geojson.load(f)

for feature in data['features']:
    feature['properties']['deaths']=d[yesterday]
    feature['properties']['date']=yesterday
    feature['properties']['cases']=cases

with open(file_new_us, 'w+') as f:
    geojson.dump(data, f, indent=2)
