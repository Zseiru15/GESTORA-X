const express = require('express');
const router = require('./routers/main');
const app = express();

app.use(express.static('public'));
app.listen(3000, () => console.log('Servidor corriendo en el puerto 3000'));
app.get('/home', router);
app.get('/about', router);