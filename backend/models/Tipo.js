const { Schema, model} = require('mongoose');

const TipoSchema = new mongoose.Schema({
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

    Descripcion:{
        type: String,
        trim: true,
        maxLength: [500, 'La descripción no debe exceder de 500 caracteres']


    }


});

module.exports = model('Tipo', TipoSchema);