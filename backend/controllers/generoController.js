const Genero = require('../models/Genero.js');

const getGeneros = async (req, res) => {
    try {
        const generos = await Genero.find();
        res.status(200).json(generos);
    } catch (error) {
        res.status(500).json({ message: 'Error procesando los datos para la entidad genero', errorDetails: error });
    }
}

const getGeneroById = async (req, res) => {
    try {
        const genero = await Genero.findById(req.params.id);
        if (!genero) return res.status(404).json({ msg: 'No encontrado' });
        res.status(200).json(genero);
    } catch (error) {
        res.status(500).json({ message: 'Error procesando los datos para la entidad genero', errorDetails: error });
    }
}

const createGenero = async (req, res) => {
    try {
        const existingGenero = await Genero.findOne({ nombre: req.body.nombre }); 
        if (existingGenero) return res.status(400).json({ msg: 'Ya existe' });

        const genero = new Genero(req.body);
        await entity.save();
        res.status(201).json(genero);
    } catch (error) {
        res.status(500).json({ message: 'Error procesando los datos para la entidad genero', errorDetails: error });
    }
}

const updateGenero = async (req, res) => {
    try {
        const genero = await Genero.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!genero) return res.status(404).json({ msg: 'No encontrado' });
        res.status(200).json(genero);
    } catch (error) {
        res.status(500).json({ message: 'Error procesando los datos para la entidad genero', errorDetails: error });
    }
}

const deleteGenero = async (req, res) => {
    try {
        const genero = await Genero.findByIdAndDelete(req.params.id);
        if (!genero) return res.status(404).json({ msg: 'No encontrado' });
        res.status(200).json({ msg: 'Eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error procesando los datos para la entidad genero', errorDetails: error });
    }
}

module.exports = { getGeneros, getGeneroById, createGenero, updateGenero, deleteGenero };