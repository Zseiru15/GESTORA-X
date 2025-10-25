// ============================
// REQUERIMOS LA BASE DE DATOS
// ============================
let users = require("../data/users");
const path = require("path");
const fs = require("fs");

// ============================
// CONTROLADOR DE USUARIOS
// ============================
const controller = {
  // 📋 Listado general
  index: (req, res) => {
    res.render("users/index", { title: "Usuarios", users });
  },

  // 🧾 Mostrar formulario de registro
  register: (req, res) => {
    res.render("users/register", { title: "Registro de usuario" });
  },

  // 💾 Procesar registro de usuario (guarda también en archivo)
  processRegister: (req, res) => {
    const data = req.body;

    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      nombre: data.nombre,
      apellido: data.apellido || "",
      edad: parseInt(data.edad) || 0,
    };

    // Agregar nuevo usuario al array
    users.push(newUser);

    // Guardar en archivo ../data/users.js
    const usersFilePath = path.join(__dirname, "../data/users.js");
    const fileContent = `let users = ${JSON.stringify(
      users,
      null,
      2
    )};\n\nmodule.exports = users;`;
    fs.writeFileSync(usersFilePath, fileContent, "utf-8");

    // Redirigir al detalle del nuevo usuario
    res.redirect(`/users/detail/${newUser.id}`);
  },

  // 🔍 Ver detalle de usuario
  detail: (req, res) => {
    const idParam = parseInt(req.params.id);
    const userSelected = users.find((user) => user.id === idParam);

    if (!userSelected) {
      return res.status(404).render("404", {
        title: "Usuario no encontrado",
        message: "El usuario solicitado no existe.",
      });
    }

    res.render("users/detail", {
      title: "Detalle de usuario",
      user: userSelected,
    });
  },

  // ✏️ Formulario de edición
  edit: (req, res) => {
    const idParam = parseInt(req.params.id);
    const userSelected = users.find((user) => user.id === idParam);

    if (!userSelected) {
      return res.status(404).render("404", {
        title: "Usuario no encontrado",
        message: "El usuario solicitado no existe.",
      });
    }

    res.render("users/edit", { title: "Editar usuario", user: userSelected });
  },

  // 💾 Procesar edición
  processEdit: (req, res) => {
    const idParam = parseInt(req.params.id);
    const data = req.body;

    const index = users.findIndex((user) => user.id === idParam);
    if (index === -1) {
      return res
        .status(404)
        .render("404", { title: "Error", message: "Usuario no encontrado" });
    }

    users[index] = { id: idParam, ...data };

    // Actualizar archivo
    const usersFilePath = path.join(__dirname, "../data/users.js");
    const fileContent = `let users = ${JSON.stringify(
      users,
      null,
      2
    )};\n\nmodule.exports = users;`;
    fs.writeFileSync(usersFilePath, fileContent, "utf-8");

    res.redirect(`/users/detail/${idParam}`);
  },

  // ❌ Eliminar usuario
  delete: (req, res) => {
    const idParam = parseInt(req.params.id);
    users = users.filter((user) => user.id !== idParam);

    // Actualizar archivo
    const usersFilePath = path.join(__dirname, "../data/users.js");
    const fileContent = `let users = ${JSON.stringify(
      users,
      null,
      2
    )};\n\nmodule.exports = users;`;
    fs.writeFileSync(usersFilePath, fileContent, "utf-8");

    res.redirect("/users");
  },

  // 🔑 Login (render)
  login: (req, res) => {
    res.render("users/login", { title: "Iniciar sesión" });
  },

  // 🔑 Procesar login (redirige al detalle del usuario)
  processLogin: (req, res) => {
    const { nombre } = req.body;
    const user = users.find((u) => u.nombre === nombre);

    if (!user) {
      return res.render("users/login", {
        title: "Iniciar sesión",
        error: "Usuario no encontrado",
      });
    }

    res.redirect(`/users/detail/${user.id}`);
  },
};

module.exports = controller;
