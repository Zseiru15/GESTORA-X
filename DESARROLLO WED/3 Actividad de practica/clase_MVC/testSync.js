const sequelize = require("./config/database");
const Rol = require("./models/Rol");
const Usuario = require("./models/Usuario");

(async () => {
  try {
    await sequelize.sync({ force: true }); // ⚠️ esto borra y recrea las tablas
    console.log("✅ Tablas sincronizadas correctamente en MySQL.");

    // Creamos un rol de ejemplo
    const admin = await Rol.create({ nombre: "Administrador" });
    console.log("🧩 Rol creado:", admin.dataValues);

    // Creamos un usuario asociado al rol
    const usuario = await Usuario.create({
      nombre: "Sneyder Camilo",
      correo: "sneyder@example.com",
      contrasena: "12345",
      telefono: "3114368376",
      rolId: admin.id
    });
    console.log("👤 Usuario creado:", usuario.dataValues);

  } catch (error) {
    console.error("❌ Error al sincronizar modelos:", error);
  } finally {
    await sequelize.close();
  }
})();
