const Media = require('../models/Media.js');

const getMedia = async (req, res) => {
    try {
        const medias = await Media.find().populate('genero director productora tipo');
        res.status(200).json(medias);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener producciones', error });
    }
}

const getMediaById = async (req, res) => {
    try {
        const media = await Media.findById(req.params.id).populate('genero director productora tipo');
        if (!media) return res.status(404).json({ msg: 'Producción no encontrada' });
        res.status(200).json(media);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener producción', error });
    }
}

const createMedia = async (req, res) => {
    try {
        const existingMedia = await Media.findOne({ serial: req.body.serial }); 
        if (existingMedia) return res.status(400).json({ msg: 'El serial ya existe' });

        const media = new Media(req.body);
        await media.save();
        res.status(201).json(media);
    } catch (error) {
        res.status(500).json({ msg: 'Error al registrar producción', error });
    }
}

const updateMedia = async (req, res) => {
    try {
        const media = await Media.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('genero director productora tipo');
        if (!media) return res.status(404).json({ msg: 'Producción no encontrada' });
        res.status(200).json(media);
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar producción', error });
    }
}

const deleteMedia = async (req, res) => {
    try {
        const media = await Media.findByIdAndDelete(req.params.id);
        if (!media) return res.status(404).json({ msg: 'Producción no encontrada' });
        res.status(200).json({ msg: 'Producción eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar producción', error });
    }
}

module.exports = { getMedia, getMediaById, createMedia, updateMedia, deleteMedia };