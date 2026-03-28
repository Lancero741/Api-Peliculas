// MongoDB Playground
// Script para insertar los géneros iniciales requeridos

// 1. Seleccionamos la base de datos
use('dbroller');

// 2. Insertamos la lista de géneros iniciales en la colección 'generos'
// Nota importante: Usamos los nombres de campos exactos definidos en tu archivo models/Genero.js
db.getCollection('generos').insertMany([
  { 
    'nombre': 'Acción', 
    'isActive': true,
    'descripcion': 'Películas con alto contenido de adrenalina, explosiones y peleas.',
    'fechaCreacion': new Date(),
    'fechaActualizacion': new Date()
  },
  { 
    'nombre': 'Aventura', 
    'isActive': true,
    'descripcion': 'Películas de viajes y descubrimientos.',
    'fechaCreacion': new Date(),
    'fechaActualizacion': new Date()
  },
  { 
    'nombre': 'Ciencia Ficción', 
    'isActive': true,
    'descripcion': 'Fantasía tecnológica, viajes espaciales y futuros distópicos.',
    'fechaCreacion': new Date(),
    'fechaActualizacion': new Date()
  },
  { 
    'nombre': 'Drama', 
    'isActive': true,
    'descripcion': 'Enfoque en el desarrollo emocional y conflictos profundos.',
    'fechaCreacion': new Date(),
    'fechaActualizacion': new Date()
  },
  { 
    'nombre': 'Terror', 
    'isActive': true,
    'descripcion': 'Diseñadas para provocar miedo o suspenso intenso.',
    'fechaCreacion': new Date(),
    'fechaActualizacion': new Date()
  }
]);

console.log("Géneros insertados correctamente");
