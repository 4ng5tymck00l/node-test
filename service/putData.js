import {cbrCurrencyData} from './jsonData.js';
import {strapiCurrencyData} from './jsonData.js';
import 'dotenv/config.js';
import {config} from './auth.js';
import axios from 'axios';

export async function putJsonData(json) {
    json.map(function (valute) {
        let data = {
            'data': {
                ...valute
            }             
        };
        delete data.data.id;
        if (valute.id) {
            async function putEntry(data) {
                axios.put(process.env.strapiCurrencies + '/' + valute.id, data, config);
            }
            return putEntry(data);
        };
        
    });
};
