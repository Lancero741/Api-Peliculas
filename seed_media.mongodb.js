// MongoDB Playground
// Script para insertar la primera película usando referencias cruzadas (Foreign Keys)

use('dbroller');

// 1. Buscamos los IDs reales en la base de datos de los registros que creamos antes
const director = db.getCollection('directors').findOne({ nombre: 'Christopher Nolan' });
const productora = db.getCollection('productoras').findOne({ nombre: 'Warner Bros.' });
const genero = db.getCollection('generos').findOne({ nombre: 'Ciencia Ficción' });
const tipo = db.getCollection('tipos').findOne({ nombre: 'Película' });

// Verificamos que todos existan para evitar errores
if (director && productora && genero && tipo) {
  // 2. Insertamos la media
  db.getCollection('media').insertOne({
    serial: 'MOV-001',
    titulo: 'Inception (El Origen)',
    sinopsis: 'Un ladrón que roba secretos corporativos mediante la tecnología de compartir sueños recibe la tarea inversa: implantar una idea en la mente de un CEO.',
    url: 'https://www.warnerbros.com/movies/inception',
    foto: 'https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg',
    añoEstreno: 2010,
    // Referencias
    director: director._id,
    productora: productora._id,
    genero: genero._id,
    tipo: tipo._id,
    // Fechas
    fechaCreacion: new Date(),
    fechaActualizacion: new Date()
  });
  console.log("Película insertada exitosamente con sus referencias intactas.");
} else {
  console.log("Error: Falta inyectar algún director, productora, género o tipo primero.");
}
