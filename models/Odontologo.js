/*
CREATE TABLE odontologos (
  id_odontologo SERIAL PRIMARY KEY,
  id_usuario INT NOT NULL UNIQUE,
  especialidad VARCHAR(100),
  numero_registro VARCHAR(50),
  telefono VARCHAR(20),
  activo BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);
*/

import { sequelize } from "../config/db.js";
import { DataTypes} from "sequelize";

import Usuario from "./Usuario.js"

const Odontologo = sequelize.define("Odontologos", {
    odontologoId: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    },
    especialidad: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    numeroRegistro: {
        type: DataTypes.STRING(50),
        allowNull: false
    }, 
    telefono: {
        type: DataTypes.STRING(10),
        allowNull: true
    }
}, {timestamps:true})


Usuario.hasOne(Odontologo, {
    foreignKey: "usuarioId",
    as: "odontologo"
})

Odontologo.belongsTo(Usuario, {
    foreignKey: "usuarioId",
    as: "usuario"
})

export default Odontologo