import mysql.connector
import geojson
import ast
from datetime import datetime, timedelta

yesterday = (datetime.now() - timedelta(2)).strftime('%m/%d/%Y')

print

file_prisons = 'express/data/us-states.geojson'
file_new_prisons = 'express/data/prisons_deaths.geojson'
d = {}

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="root",
  database="covid_map"
)

mycursor = mydb.cursor()

mycursor.execute("SELECT * FROM prisons WHERE as_of_date = '" + yesterday + "'")

myresult = mycursor.fetchall()

i = 0

print(myresult)

"""
for x in myresult:
    d[myresult[i][3]]=myresult[i][5]
    i+=1



#states data
with open(file_prisons, 'r') as f:
    data = geojson.load(f)

for feature in data['features']:
    if feature['id'] in d:
        feature['properties']['deaths']=d[feature['id']]

with open(file_new_prisons, 'w+') as f:
    geojson.dump(data, f, indent=2)
"""