const fetch = require('node-fetch')
const d3 = require('d3')
const R = require('ramda')

const writeJson = require('./writeJson')
/*
  writeJson prends deux arguments:
    * le nom du fichier
    * un objet ou une liste JSON

  ex:
    writeJson('asylumByCountry.json', list)
*/

const DATA = require('./asylum.json') // asylum.json doit être créé avec prepareData

const COUNTRIES = R.uniq(DATA.map(R.prop("country_asylum"))); // récupère tous les pays

const findAndCountCountry = country_asylum => ({
    country_asylum, somme :
        DATA.filter(d => d.country_asylum === country_asylum) // pour filtrer les données par pays
            .map(d => d.affected) // pour créer un tableau avec que les nombres de migrants
            .reduce((somme, d) => somme + d, 0) // pour incrémenter les valeurs et avoir plus que la somme
});

let COUNTRIES_STATS = COUNTRIES.map(pays => findAndCountCountry(pays));

writeJson('asylumByCountry.json', COUNTRIES_STATS); // pour créer le fichier

console.log("JSON create")