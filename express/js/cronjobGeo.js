//This file is to automatically update the geojson files daily
const CronJob = require('cron').CronJob;


console.log('Before job instantiation');
const job = new CronJob('00 30 3 * * *', function() {
    const d = new Date();
    console.log('GeoJSON files updated at 3:30AM EST:', d);
    const us = require('./runPythonUS.js');
    const counties = require('./runPythonCounties.js');
    const states = require('./runPythonStates.js');
    const prisons = require('./runPythonPrisons.js');
});
console.log('After job instantiation');
job.start();