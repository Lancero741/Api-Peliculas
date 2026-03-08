const Media = require('../models/Media');
const { Router } = require('express');
const router = Router();

// 1. Consultar todas las producciones (GET)
router.get('/', async function(req, res) {
    try {
        const producciones = await Media.find().populate([
            { path: 'genero', select: 'nombre estado' },
            { path: 'director', select: 'nombres estado' },
            { path: 'productora', select: 'nombre estado' },
            { path: 'tipo', select: 'nombre' }
        ]);
        res.send(producciones);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al consultar producciones');
    }
});

// 2. Crear nueva película o serie (POST) 
router.post('/', async function(req, res) {
    try {
        let media = new Media();
        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.sinopsis = req.body.sinopsis;
        media.url = req.body.url;
        media.foto = req.body.foto;
        media.añoEstreno = req.body.añoEstreno;
        
        // Asignación de llaves foráneas//
        media.genero = req.body.genero._id;
        media.director = req.body.director._id;
        media.productora = req.body.productora._id;
        media.tipo = req.body.tipo._id;

        media = await media.save();
        res.send(media);
    } catch (error) {
        console.log(error);
        res.status(400).send('Error al registrar la producción');
    }
});

module.exports = router;