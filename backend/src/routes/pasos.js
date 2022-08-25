const express = require('express');
const registroSchema = require('../models/registro')
const mongoose = require('mongoose');

const router = express.Router();

// crear registro
router.post('/add', (req, res) => {
    const registro = registroSchema(req.body);
    registro.save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

// obtener registros
router.get('/leer', (req, res) => {
    registroSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

module.exports = router;

