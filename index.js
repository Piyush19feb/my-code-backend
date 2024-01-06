'use strict';
// const scheduledFunctions = require('./express/functions/cron');

const app = require('./express/server');

// ADD CALL to execute your function(s)
// scheduledFunctions.initScheduledJobs();

app.listen(4000, () => console.log('Local app listening on port 4000!'));
