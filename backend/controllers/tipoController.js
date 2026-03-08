const Tipo = require('../model/Tipo.js');
const { request, response } = require('express');

const getTipo = async ( req = request, res = response) => {
        try {
        const tipos = await Tipo.find();
        res.status(200).json(tipos);
    }catch (error) {
        console.error('×  Error al obtener tipos: ', error);
        res.status(500),json({ msg: 'Error al listar los tipos'});
    }
}

const createTipo = async (req = request, res = response) => {
    try {
        const {nombre, FechaCreacion, fechActualizacion, descripcion} = req.body;

        const tipoDB = await Tipo.findOne({ nombre });
        if (tipoDB) {
            return res.status(400).json({ msg: 'El tipo "${nombre}" ya existe'});

        }

        const tipo = new Tipo({ nombre, FechaCreacion, fechActualizacion, descripcion });

        await tipo.save();
        res.status(201).json(tipo);
    } catch (error) {

        console.error(' ✕ error al crear el tipo: ', error);
        res.status(500),json({ msg: 'Error al crear el tipo'});
    }
}

module.exports = {
    getTipos,
    createTipo
}