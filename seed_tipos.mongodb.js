// MongoDB Playground
// Script para insertar los tipos de multimedia iniciales

use('dbroller');

// Insertamos la lista de tipos en la colección Mongoose (usualmente pluralizada a 'tipos')
db.getCollection('tipos').insertMany([
  { 
    'nombre': 'Película', 
    'isActive': true,
    'descripcion': 'Obra cinematográfica que cuenta una historia en formato de largometraje o cortometraje.',
    'fechaCreacion': new Date(),
    'fechaActualizacion': new Date()
  },
  { 
    'nombre': 'Serie', 
    'isActive': true,
    'descripcion': 'Producción audiovisual dividida en episodios, generalmente organizados por temporadas.',
    'fechaCreacion': new Date(),
    'fechaActualizacion': new Date()
  }
]);

console.log("Tipos insertados correctamente");
