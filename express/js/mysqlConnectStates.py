import mysql.connector
import geojson
import ast
from datetime import datetime, timedelta

#two days ago actually
yesterday = (datetime.now() - timedelta(2)).strftime('%Y-%m-%d')



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

d = dict()

for x in myresult:
    d[myresult[i][2]] = []
    d[myresult[i][2]].append(myresult[i][4])
    d[myresult[i][2]].append(myresult[i][3])
    i+=1

#print(d['01'][0])


#states data
with open(file_states, 'r') as f:
    data = geojson.load(f)

for feature in data['features']:
    if feature['id'] in d:
        feature['properties']['deaths']=d[feature['id']][0]
        feature['properties']['cases']= d[feature['id']][1]

with open(file_new_states, 'w+') as f:
    geojson.dump(data, f, indent=2)
