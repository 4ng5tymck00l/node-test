import axios from 'axios';
import 'dotenv/config';

export async function getData() {
    const dataMoneyXML = await axios.get(process.env.cbrURL, { responseType: "arraybuffer" });
    return dataMoneyXML;
}
