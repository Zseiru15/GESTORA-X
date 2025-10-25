let users = require('../data/users');

// Controlador principal
const controller = {
    index: function(req, res) {
        res.render('index', { 
            title: 'Inicio',
            users 
        });
    }
};

module.exports = controller;