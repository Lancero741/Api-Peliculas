const { Schema, model } = require('mongoose');

const GeneroSchema = new Schema({
    nombre: { type: String, required: [true, 'El campo "nombre" es obligatorio'], unique: true, trim: true },
    isActive: { type: Boolean, default: true },
    descripcion: { type: String, trim: true, maxLength: [500, 'La descripción no debe exceder de 500 caracteres'] }
}, {
    timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' }
});

module.exports = model('Genero', GeneroSchema);