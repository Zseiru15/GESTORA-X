const sequelize = require("./config/database");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a MySQL establecida correctamente.");
  } catch (error) {
    console.error("❌ Error al conectar a MySQL:", error);
  }
})();
