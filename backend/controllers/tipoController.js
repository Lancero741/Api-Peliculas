const Tipo = require('../models/Tipo.js');

const getTipos = async (req, res) => {
    try {
        const tipos = await Tipo.find();
        res.status(200).json(tipos);
    } catch (error) {
        res.status(500).json({ message: 'Error procesando los datos para la entidad tipo', errorDetails: error });
    }
}

const getTipoById = async (req, res) => {
    try {
        const tipo = await Tipo.findById(req.params.id);
        if (!tipo) return res.status(404).json({ msg: 'No encontrada' });
        res.status(200).json(tipo);
    } catch (error) {
        res.status(500).json({ message: 'Error procesando los datos para la entidad tipo', errorDetails: error });
    }
}

const createTipo = async (req, res) => {
    try {
        const existingTipo = await Tipo.findOne({ nombre: req.body.nombre }); 
        if (existingTipo) return res.status(400).json({ msg: 'Ya existe' });

        const tipo = new Tipo(req.body);
        await entity.save();
        res.status(201).json(tipo);
    } catch (error) {
        res.status(500).json({ message: 'Error procesando los datos para la entidad tipo', errorDetails: error });
    }
}

const updateTipo = async (req, res) => {
    try {
        const tipo = await Tipo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!tipo) return res.status(404).json({ msg: 'No encontrada' });
        res.status(200).json(tipo);
    } catch (error) {
        res.status(500).json({ message: 'Error procesando los datos para la entidad tipo', errorDetails: error });
    }
}

const deleteTipo = async (req, res) => {
    try {
        const tipo = await Tipo.findByIdAndDelete(req.params.id);
        if (!tipo) return res.status(404).json({ msg: 'No encontrada' });
        res.status(200).json({ msg: 'Eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error procesando los datos para la entidad tipo', errorDetails: error });
    }
}

module.exports = { getTipos, getTipoById, createTipo, updateTipo, deleteTipo };