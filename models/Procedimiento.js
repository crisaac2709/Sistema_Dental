/*

-- PROCEDIMIENTOS
CREATE TABLE procedimientos (
  id_procedimiento SERIAL PRIMARY KEY,
  codigo VARCHAR(20) UNIQUE,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  duracion_estimada_min INT,
  precio_base NUMERIC(10,2) NOT NULL
);

*/

import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const Procedimiento = sequelize.define("Procedimientos", {
  procedimientoId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  codigo: {
    type: DataTypes.STRING(20),
    unique: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: true
  },
  descripcion: DataTypes.TEXT,
  duracionEstimadaMinutos: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1
    }
  },
  precioBase: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
    validate: {
      min: 0
    }
  }
}, {timestamps:true})


export default Procedimiento