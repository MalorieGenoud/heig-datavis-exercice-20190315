const fetch = require('node-fetch');
const d3 = require('d3');
const R = require('ramda');
const writeJson = require('./writeJson')

const url = 'https://raw.githubusercontent.com/idris-maps/heig-datavis-2019/master/20190322-node/exercice_node/ch_asylum_demands.csv';

const unknown = function(list){
    list.filter(data => data.affected !== "*")
    return list;
};

const yearInt = function(list){
    list.map(data => ({...data, year: Number(data.year)}))
    return list;
};

const affectedInt = function(list){
    list.map(data => ({...data, affected: Number(data.affected)}))
    return list;
};

const makeUSA = function (list) {
    list.map(data => ({
        ...data, country_asylum: data.country_asylum.includes("USA") ? "USA" : data.country_asylum
    }))
    return list;
};

fetch(url)
    .then(data => data.text())
    .then(csv => d3.csvParse(csv))
    .then(list => unknown(list))
    .then(list => yearInt(list))
    .then(list => affectedInt(list))
    .then(list => makeUSA(list))
    .then(data => writeJson('asylum.json', data))
    .then(console.log('JSON create'));