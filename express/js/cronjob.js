const CronJob = require('cron').CronJob;


console.log('Before job instantiation');
const job = new CronJob('00 30 2 * * *', function() {
    const d = new Date();
    console.log('Updated at 2:30AM EST:', d);
    const us = require('../rest_api/rest_api_us.js');
    const counties = require('../rest_api/rest_api_counties.js');
    const states = require('../rest_api/rest_api_states.js');
    const prisons = require('../rest_api/rest_api_prisons.js');
});
console.log('After job instantiation');
job.start();