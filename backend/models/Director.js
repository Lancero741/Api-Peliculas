const { Schema, model } = require('mongoose');

const DirectorSchema = new Schema({
    nombre: { type: String, required: [true, 'El campo "nombre" es obligatorio'], unique: true, trim: true },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' }
});

module.exports = model('Director', DirectorSchema);