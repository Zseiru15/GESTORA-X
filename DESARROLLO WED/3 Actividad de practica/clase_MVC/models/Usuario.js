const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Rol = require("./Rol");

const Usuario = sequelize.define("Usuario", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  correo: { type: DataTypes.STRING, allowNull: false, unique: true },
  contrasena: { type: DataTypes.STRING, allowNull: false },
  telefono: { type: DataTypes.STRING },
  rolId: { type: DataTypes.INTEGER, allowNull: true },
}, {
  tableName: "usuarios",
  timestamps: false
});

// 🔗 Relación: Un Rol tiene muchos Usuarios
Rol.hasMany(Usuario, { foreignKey: "rolId" });
Usuario.belongsTo(Rol, { foreignKey: "rolId" });

module.exports = Usuario;
