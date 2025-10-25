const express = require('express');
const path    = require('path');
const app     = express();
const publicFolderPath = path.resolve(__dirname, './public');
app.use(express.static(publicFolderPath));

const puerto = 3000;
app.listen(puerto, () =>{
    console.log(`Esta corriendo en el puerto ${puerto}`)
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/index.html'));
});

app.get('/babbage', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/babbage.html'));
});

app.get('/berners-lee', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/berners-lee.html'));
});

app.get('/clarke', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/clarke.html'));
});

app.get('/hamilton', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/hamilton.html'));
});

app.get('/hopper', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/hopper.html'));
});

app.get('/lovelace', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/lovelace.html'));
});

app.get('/turing', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/turing.html'));
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.resolve(__dirname, './views/error.html'));
});
