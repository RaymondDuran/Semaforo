const mongoose = require('mongoose');

const registroSchema = mongoose.Schema({
    pasos: {
        type: Number,
        required: true
    },
    ubicacion: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('registro', registroSchema);