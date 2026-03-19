const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { getConnection } = require('./db/db-connection-mongo');

const app = express();

getConnection();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/directores', require('./routes/directorRoute'));
app.use('/api/generos', require('./routes/generoRoute'));
app.use('/api/productoras', require('./routes/productoraRoute'));
app.use('/api/tipos', require('./routes/tipoRoute'));
app.use('/api/media', require('./routes/mediaRoute'));

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});