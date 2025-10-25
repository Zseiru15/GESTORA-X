const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController");

// === FORMULARIO DE REGISTRO ===
router.get("/register", usersController.register);
router.post("/register", usersController.processRegister);

// === FORMULARIO DE LOGIN ===
router.get("/login", usersController.login);
router.post("/login", usersController.processLogin);

// === DETALLE DE USUARIO ===
router.get("/detail/:id", usersController.detail);

// === EDICIÓN DE USUARIO ===
router.get("/edit/:id", usersController.edit);
router.put("/edit/:id", usersController.processEdit);

// === ELIMINAR USUARIO ===
router.delete("/delete/:id", usersController.delete);

module.exports = router;
