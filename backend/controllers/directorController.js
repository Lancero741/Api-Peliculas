const Director = require('../models/Director.js');

const getDirectores = async (req, res) => {
    try {
        const directores = await Director.find();
        res.status(200).json(directores);
    } catch (error) {
        res.status(500).json({ msg: 'Error al listar los directores', error });
    }
}

const getDirectorById = async (req, res) => {
    try {
        const director = await Director.findById(req.params.id);
        if (!director) return res.status(404).json({ msg: 'Director no encontrado' });
        res.status(200).json(director);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener el director', error });
    }
}

const createDirector = async (req, res) => {
    try {
        const existingDirector = await Director.findOne({ nombre: req.body.nombre }); 
        if (existingDirector) return res.status(400).json({ msg: 'El director ya existe' });

        const director = new Director(req.body);
        await director.save();
        res.status(201).json(director);
    } catch (error) {
        res.status(500).json({ msg: 'Error al crear el director', error });
    }
}

const updateDirector = async (req, res) => {
    try {
        const director = await Director.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!director) return res.status(404).json({ msg: 'Director no encontrado' });
        res.status(200).json(director);
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar el director', error });
    }
}

const deleteDirector = async (req, res) => {
    try {
        const director = await Director.findByIdAndDelete(req.params.id);
        if (!director) return res.status(404).json({ msg: 'Director no encontrado' });
        res.status(200).json({ msg: 'Director eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar el director', error });
    }
}

module.exports = { getDirectores, getDirectorById, createDirector, updateDirector, deleteDirector };