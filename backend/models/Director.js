const { Schema, model} = require('mongoose');

const DirectorSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El campo "nombre" es obligatorio'],
        unique: true,
        trim: true
    },
    estado: {
        type: String,
        required: true,
        enum: ['Activo', 'No activo'],
        default: 'Activo'

    },
    FechaCreacion: {
        type: Date,
        required: true,
        timestamps: true
    },

    FechActualizacion: {
        type: Date,
        timestamps: true
    },

    


});

module.exports = model('Director', DirectorSchema);