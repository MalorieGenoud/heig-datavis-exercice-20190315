const d3 = require('d3')
const fs = require('fs')
const writeSvg = svg =>
    fs.writeFileSync('graph.svg', svg, 'utf-8')
const DATA = require('./calculateByCountry.json');

const graph = DATA => `<svg width="1800" heigth="800" xmlns="http://www.w3.org/2000/svg">
	${DATA.map((d,i) => `<circle cx="${(i+1)*87}" cy="120" r="${d.somme}" fill="blue" />
						<text x="${(i+1)*80}" y="30" font-family="Helvetica" font-size="10">${d.country_asylum}(${d.somme})</text>`).join('\n')}
						<text x="700" y="220" font-family="Helvetica" font-size="20">Demandes d'asiles par pays</text>
</svg>`


writeSvg(graph(DATA));