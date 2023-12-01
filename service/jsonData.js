import {getData} from './xmlData.js';
import iconv from 'iconv-lite';
import xml2js from 'xml2js';
import axios from 'axios';

async function getDataJson() { 
    const dataMoneyJson = await getData().then(response => {
        const xmlMoney = iconv.decode(Buffer.from(response.data), 'windows-1251');
        let json;
        xml2js.parseString(xmlMoney, function (err, result) {
    	    json = result;
        });
        json = json.ValCurs.Valute;
        json = json.map(function (valute) {
            let valuteNew = {
                CbrId: valute.$.ID,
                NumCode: valute.NumCode[0],
                CharCode: valute.CharCode[0],
                Name: valute.Name[0],
                Nominal: valute.Nominal[0],
                Value: valute.Value[0],
                VunitRate: valute.VunitRate[0]                
            }
            return valuteNew;
        });
        
        return json;        
    });
    return dataMoneyJson;
};

function getDifference(data1, data2) {
  return data1.filter(object1 => {
    return !data2.some(object2 => {
      return object1.Name === object2.Name;
    });
  });
};

export let cbrCurrencyData = await getDataJson();

export let strapiCurrencyData = await axios.get(process.env.strapiCurrencies + '?pagination[limit]=1000').then((res)=>{
    let strapiData = res.data.data.map(function (obj) {
        let data = {
            id: obj.id,
            ...obj.attributes
        }
        return data;
        });
    return strapiData;
}).catch((err)=>{
    throw err;
});

export let missing = getDifference(cbrCurrencyData, strapiCurrencyData);
//export let extra = getDifference(strapiCurrencyData, cbrCurrencyData);

function assignCbrToStrapi() {
    let newData = cbrCurrencyData.map(function (obj) {
        let data = {
            ...obj
        };
        strapiCurrencyData.forEach((currencyStrapi) => {
            if (obj.CbrId === currencyStrapi.CbrId) {
                data.id = currencyStrapi.id;
            };
        });
        return data;
    });
    return newData;
};

export let assignedData = assignCbrToStrapi();


