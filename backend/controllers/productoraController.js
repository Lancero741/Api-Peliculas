const Productora = require('../models/Productora.js');

const getProductoras = async (req, res) => {
    try {
        const productoras = await Productora.find();
        res.status(200).json(productoras);
    } catch (error) {
        res.status(500).json({ message: 'Error procesando los datos para la entidad productora', errorDetails: error });
    }
}

const getProductoraById = async (req, res) => {
    try {
        const productora = await Productora.findById(req.params.id);
        if (!productora) return res.status(404).json({ msg: 'No encontrado' });
        res.status(200).json(productora);
    } catch (error) {
        res.status(500).json({ message: 'Error procesando los datos para la entidad productora', errorDetails: error });
    }
}

const createProductora = async (req, res) => {
    try {
        const existingProductora = await Productora.findOne({ nombre: req.body.nombre }); 
        if (existingProductora) return res.status(400).json({ msg: 'Ya existe' });

        const productora = new Productora(req.body);
        await entity.save();
        res.status(201).json(productora);
    } catch (error) {
        res.status(500).json({ message: 'Error procesando los datos para la entidad productora', errorDetails: error });
    }
}

const updateProductora = async (req, res) => {
    try {
        const productora = await Productora.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!productora) return res.status(404).json({ msg: 'No encontrado' });
        res.status(200).json(productora);
    } catch (error) {
        res.status(500).json({ message: 'Error procesando los datos para la entidad productora', errorDetails: error });
    }
}

const deleteProductora = async (req, res) => {
    try {
        const productora = await Productora.findByIdAndDelete(req.params.id);
        if (!productora) return res.status(404).json({ msg: 'No encontrado' });
        res.status(200).json({ msg: 'Eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error procesando los datos para la entidad productora', errorDetails: error });
    }
}

module.exports = { getProductoras, getProductoraById, createProductora, updateProductora, deleteProductora };