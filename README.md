<h3>About the Project</h3>

Node is used to start the program, and demo.js is our main file. This contains Leaflet code that reads in data from our locally stored geojson files to display data on the map.
The geojson files are updated daily by our MySQL database. Our database is updated daily by utilizing a REST API to fetch data from other github data sources.

After cloning to your local machine, cd into the directory where you cloned this and type the command:

<b>npm install</b>

To start the server, run the command:

<b>npm start</b>

Then visit http://localhost:3000

<h3>Useful Files</h3>

<b>index.html</b>

This is called when using npm start and displays the website.

<b>/js/demo.js</b>

This file contains all the Leaflet data, along with the GUI and reads the data from the updated geojson files stored in the data folder.

<b>/js/cronjob.js</b>

This sets up a job to automatically update the database at 2:30am EST daily. Use the command node express/js/cronjob.js to start it.

<b>/js/cronjobGeo.js</b>

This sets up a job to automatically update the geojson files at 3:30am EST daily. Use the command node express/js/cronjobGeo.js to start it.

<b>/rest_api/generateDB.js</b>

This runs all of our REST API scripts at once for updating our database. Good to use if you're testing or don't want to wait for cronjob.

<b>/js/generateGeo.js</b>

This runs all of our scripts for updating our geojson files from the updated data from our database. Good to use if you're testing or don't want to wait for cronjob.
