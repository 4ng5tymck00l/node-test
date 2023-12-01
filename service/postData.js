import axios from 'axios';
import 'dotenv/config.js';
import {config} from './auth.js';

export async function postJsonData(json) {
    json.map(function (valute) {
        let data = {
            'data': {
                ...valute
            }             
        };
        async function postEntry(data) {
            axios.post(process.env.strapiCurrencies, data, config);
        }
        return postEntry(data);
    });
};

