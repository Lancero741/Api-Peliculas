const express = require('express');
const { dbConnection } = require('./db/config'); // Debes crear tu conexión a DB
const app = express();

// Middlewares
app.use(express.json());

// Rutas
app.use('/api/directores', require('./routes/director'));
app.use('/api/generos', require('./routes/genero'));
app.use('/api/media', require('./mediaController'));
app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});