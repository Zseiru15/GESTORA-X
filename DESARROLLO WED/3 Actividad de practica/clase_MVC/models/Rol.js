const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Rol = sequelize.define("Rol", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: "roles",
  timestamps: false
});

module.exports = Rol;
