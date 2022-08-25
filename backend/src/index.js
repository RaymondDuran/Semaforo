const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const pasosRoutes = require('./routes/pasos');
var cors = require('cors')

const app = express();
app.use(cors())
const port = process.env.PORT || 9000;


// Middleware
app.use(express.json());
app.use('/api', pasosRoutes);

//routes
app.get('/', (req, res) => {
    res.send('Bienvenido a mi API');
});



// MongoDB Connection
mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch((error) => console.error(error));



app.listen(port, () =>  console.log('server listening on port', port));