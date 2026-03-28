require('dotenv').config();
const mongoose = require('mongoose');

const Media = require('./models/Media');
const Director = require('./models/Director');
const Productora = require('./models/Productora');
const Genero = require('./models/Genero');
const Tipo = require('./models/Tipo');

const URI = process.env.MONGO_URI;

mongoose.connect(URI, { family: 4 })
  .then(async () => {
    console.log("Conectado a MongoDB Atlas. Preparando el Módulo de Media Master...");
    
    try {
      // 1. Buscamos las referencias de las colecciones maestras insertadas
      const nolan = await Director.findOne({ nombre: 'Christopher Nolan' });
      const warner = await Productora.findOne({ nombre: 'Warner Bros.' });
      const sciFi = await Genero.findOne({ nombre: 'Ciencia Ficción' });
      const peli = await Tipo.findOne({ nombre: 'Película' });

      if (!nolan || !warner || !sciFi || !peli) {
        throw new Error("Falta alguna referencia base. Asegúrate de inyectar las maestras.");
      }

      // 2. Insertamos la película
      await Media.deleteMany({}); // Opcional purgar media inicial
      await Media.create({
        serial: 'MOV-001',
        titulo: 'Inception',
        sinopsis: 'Un hábil ladrón es el mejor en el peligroso arte de la extracción: roba valiosos secretos de lo más profundo del subconsciente durante el estado de sueño.',
        url: 'https://vimeo.com/112705139',
        foto: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
        añoEstreno: 2010,
        genero: sciFi._id,
        director: nolan._id,
        productora: warner._id,
        tipo: peli._id
      });

      console.log("¡ÉXITO! 'Inception' (Media) ha sido insertada junto a todas sus 4 referencias externas (Foreign Keys).");
    } catch (error) {
      console.error("Error al insertar Media:", error);
    } finally {
      process.exit(0);
    }
  })
  .catch(err => {
    console.error("Fallo la conexión:", err);
    process.exit(1);
  });
