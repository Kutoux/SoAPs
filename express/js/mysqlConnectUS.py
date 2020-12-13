import mysql.connector
import geojson
import ast
from datetime import datetime, timedelta

yesterday = (datetime.now() - timedelta(1)).strftime('%Y-%m-%d')



file_states = 'express/data/us-states.geojson'
file_new_states = 'express/data/states_deaths.geojson'
d = {}

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="root",
  database="covid_map"
)

mycursor = mydb.cursor()

mycursor.execute("SELECT * FROM states WHERE date = '" + yesterday + "'")

myresult = mycursor.fetchall()

i = 0


for x in myresult:
    d[myresult[i][3]]=myresult[i][5]
    i+=1



#states data
with open(file_states, 'r') as f:
    data = geojson.load(f)

for feature in data['features']:
    if feature['id'] in d:
        feature['properties']['deaths']=d[feature['id']]

with open(file_new_states, 'w+') as f:
    geojson.dump(data, f, indent=2)
