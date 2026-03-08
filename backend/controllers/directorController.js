const Director = require('../models/Director.js');
const { request, response } = require('express');

const getDirectores = async (req = request, res = response) => {
    try {
        const directores = await Director.find();
        res.status(200).json(directores);
    } catch (error) {
        console.error('Error al obtener directores:', error);
        res.status(500).json({ msg: 'Error al listar los directores' });
    }
}

const createDirector = async (req = request, res = response) => {
    try {
        const { nombre, estado, FechaCreacion, fechActualizacion } = req.body;
        // Corregido: Usar Director en lugar de Genero
        const directorDB = await Director.findOne({ nombres }); 
        if (directorDB) {
            return res.status(400).json({ msg: `El director ${nombre} ya existe` });
        }

        const director = new Director({ nombre, estado, FechaCreacion, fechActualizacion });
        await director.save();
        res.status(201).json(director);
    } catch (error) {
        console.error('Error al crear director:', error);
        res.status(500).json({ msg: 'Error al crear el director' });
    }
}

module.exports = { getDirectores, createDirector };