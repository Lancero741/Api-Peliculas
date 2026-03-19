const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('Caso_Estudio_Peliculas.pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(console.error);
