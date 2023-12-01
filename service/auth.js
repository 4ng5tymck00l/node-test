import axios from 'axios';
import 'dotenv/config.js';

let { data } = await axios.post(process.env.strapiAuth, {
  identifier: process.env.strapiIdentifier,
  password: process.env.strapiPassword,
});

export const config = {
    headers: {
  	Authorization: `Bearer ${data.jwt}`
    }
};
