import {postJsonData} from './service/postData.js';
import {putJsonData} from './service/putData.js';
import {missing} from './service/jsonData.js';
import {assignedData} from './service/jsonData.js';
import cron from 'node-cron';
import axios from 'axios';


if (missing) {
    postJsonData(missing);    
};
    
cron.schedule('*/10 * * * * *', function() {
    putJsonData(assignedData);
    console.log('data updated (every 10 sec)');
});
