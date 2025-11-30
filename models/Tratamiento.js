/*
-- TRATAMIENTOS
CREATE TABLE tratamientos (
  id_tratamiento SERIAL PRIMARY KEY,
  id_cita INT NOT NULL,
  id_procedimiento INT NOT NULL,
  pieza_dental VARCHAR(10),
  cara VARCHAR(20),
  diagnostico TEXT,
  observaciones TEXT,
  estado VARCHAR(20) NOT NULL,
  fecha_inicio TIMESTAMP,
  fecha_fin TIMESTAMP,
  FOREIGN KEY (id_cita) REFERENCES citas(id_cita),
  FOREIGN KEY (id_procedimiento) REFERENCES procedimientos(id_procedimiento)
);
*/


import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";
import Cita from "./Cita.js"
import Procedimiento from "./Procedimiento.js";

const Tratamiento = sequelize.define("Tratamientos", {
  tratamientoId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pieza_dental: DataTypes.STRING(50),
  diagnostico: DataTypes.TEXT,
  observaciones: DataTypes.TEXT,
  estado: {
    type: DataTypes.STRING(25),
    allowNull: false
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: false
  },
  fecha_fin: {
    type: DataTypes.DATE,
    allowNull: false
  }
})

// Relaciones
Cita.hasMany(Tratamiento, {
  foreignKey: "citaId",
  as: "citas_tratamiento",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

Tratamiento.belongsTo(Cita, {
  foreignKey: "citaId",
  as: "cita"
})


Procedimiento.hasMany(Tratamiento, {
  foreignKey: "procedimientoId",
  as: "tratamientos_procedimiento",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

Tratamiento.hasMany(Procedimiento, {
  foreignKey: "procedimientoId",
  as: "procedimiento"
})

export default Tratamiento

