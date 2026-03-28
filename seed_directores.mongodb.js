// MongoDB Playground
// Script para insertar algunos directores iniciales (Datos de ejemplo)

use('dbroller');

// Insertamos la lista de directores en la colección 'directors'
// Nota: Mongoose pluraliza "Director" al inglés como "directors". 
db.getCollection('directors').insertMany([
  { 
    'nombre': 'Christopher Nolan', 
    'isActive': true,
    'fechaCreacion': new Date(),
    'fechaActualizacion': new Date()
  },
  { 
    'nombre': 'Steven Spielberg', 
    'isActive': true,
    'fechaCreacion': new Date(),
    'fechaActualizacion': new Date()
  },
  { 
    'nombre': 'Quentin Tarantino', 
    'isActive': true,
    'fechaCreacion': new Date(),
    'fechaActualizacion': new Date()
  },
  { 
    'nombre': 'Martin Scorsese', 
    'isActive': true,
    'fechaCreacion': new Date(),
    'fechaActualizacion': new Date()
  },
  { 
    'nombre': 'Guillermo del Toro', 
    'isActive': true,
    'fechaCreacion': new Date(),
    'fechaActualizacion': new Date()
  }
]);

console.log("Directores de ejemplo insertados correctamente");
