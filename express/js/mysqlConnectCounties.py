import mysql.connector
import geojson
import ast
from datetime import datetime, timedelta
from collections import defaultdict

#two days ago actually
yesterday = (datetime.now() - timedelta(2)).strftime('%Y-%m-%d')

file_counties = 'express/data/test.geojson'
file_new_counties = 'express/data/counties_deaths.geojson'
d = {}

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="root",
  database="covid_map"
)

mycursor = mydb.cursor()

mycursor.execute("SELECT * FROM counties WHERE date = '" + yesterday + "'")

myresult = mycursor.fetchall()

i = 0

d = dict()

for x in myresult:
    d[myresult[i][3]] = []
    d[myresult[i][3]].append(myresult[i][5])
    d[myresult[i][3]].append(myresult[i][4])
    i+=1
    


#counties data
with open(file_counties, 'r') as f:
    data = geojson.load(f)

for feature in data['features']:
    if feature['properties']['countyFIPS'] in d:
        feature['properties']['deaths']=d[feature['properties']['countyFIPS']][0]
        feature['properties']['cases']=d[feature['properties']['countyFIPS']][1]

with open(file_new_counties, 'w+') as f:
    geojson.dump(data, f, indent=2)
