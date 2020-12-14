import mysql.connector
import geojson
import ast
from datetime import datetime, timedelta
from collections import defaultdict

yesterday = (datetime.now() - timedelta(1)).strftime('%Y-%m-%d')

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


for x in myresult:
    d[myresult[i][3]]=myresult[i][5]
    i+=1
    
#counties data
with open(file_counties, 'r') as f:
    data = geojson.load(f)

for feature in data['features']:
    if feature['properties']['countyFIPS'] in d:
        feature['properties']['population']=d[feature['properties']['countyFIPS']]

with open(file_new_counties, 'w+') as f:
    geojson.dump(data, f, indent=2)
