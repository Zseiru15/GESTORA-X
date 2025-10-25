const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
router.get('/register', productController.register);
router.post('/register', productController.processRegister);

router.get('/edit/:id', productController.edit);
router.put('/edit/:id', productController.processEdit);

router.get('/detail/:id', productController.detail);

router.delete('/detail/:id', productController.delete);

module.exports = router;