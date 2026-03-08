const Genero = require('../models/Genero.js');
const { request, response } = require('express');

const getGeneros = async ( req = request, res = response) => {
        try {
        const generos = await Genero.find();
        res.status(200).json(generos);
    }catch (error) {
        console.error('×  Error al obtener generos: ', error);
        res.status(500),json({ msg: 'Error al listar los géneros'});
    }
}

const createGenero = async (req = request, res = response) => {
    try {
        const {nombre, descripcion} = req.body;

        const generoDB = await Genero.findOne({ nombre });
        if (generoDB) {
            return res.status(400).json({ msg: 'El genero "${nombre}" ya existe'});

        }

        const genero = new Genero({ nombre, descripcion });

        await genero.save();
        res.status(201).json(genero);
    } catch (error) {

        console.error(' ✕ error al crear genero: ', error);
        res.status(500),json({ msg: 'Error al crear el genero'});
    }
}

module.exports = {
    getGeneros,
    createGenero
}