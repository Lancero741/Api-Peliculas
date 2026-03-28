// MongoDB Playground
// Script para insertar las productoras iniciales

use('dbroller');

// Insertamos la lista de productoras sugeridas en la colección 'productoras'
// Nota: La colección dependerá de cómo Mongoose la pluralice, usualmente 'productoras'
db.getCollection('productoras').insertMany([
  { 
    'nombre': 'Disney', 
    'isActive': true,
    'descripcion': 'Una de las compañías de entretenimiento más grandes del mundo, conocida por sus clásicos animados y franquicias como Marvel y Star Wars.',
    'slogan': 'The Happiest Place on Earth',
    'fechaCreacion': new Date(),
    'fechaActualizacion': new Date()
  },
  { 
    'nombre': 'Warner Bros.', 
    'isActive': true,
    'descripcion': 'Estudio de cine y entretenimiento global, famoso por DC Comics, Harry Potter y clásicos del cine.',
    'slogan': 'Welcome to the New Age',
    'fechaCreacion': new Date(),
    'fechaActualizacion': new Date()
  },
  { 
    'nombre': 'Paramount Pictures', 
    'isActive': true,
    'descripcion': 'Uno de los estudios de cine más antiguos del mundo, conocido por películas como El Padrino, Titanic y Mission: Impossible.',
    'slogan': 'A Mountain of Entertainment',
    'fechaCreacion': new Date(),
    'fechaActualizacion': new Date()
  },
  { 
    'nombre': 'MGM (Metro-Goldwyn-Mayer)', 
    'isActive': true,
    'descripcion': 'Famoso estudio del león rugiente, responsable de franquicias como James Bond y Rocky.',
    'slogan': 'Ars Gratia Artis (El arte por el arte)',
    'fechaCreacion': new Date(),
    'fechaActualizacion': new Date()
  }
]);

console.log("Productoras insertadas correctamente");
