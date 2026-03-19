const { Schema, model } = require('mongoose');

const ProductoraSchema = new Schema({
    nombre: { type: String, required: [true, 'El campo "nombre" es obligatorio'], unique: true, trim: true },
    isActive: { type: Boolean, default: true },
    descripcion: { type: String, trim: true, maxLength: [500, 'La descripción no debe exceder de 500 caracteres'], required: false },
    slogan: { type: String, trim: true, required: false }
}, {
    timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' }
});

module.exports = model('Productora', ProductoraSchema);