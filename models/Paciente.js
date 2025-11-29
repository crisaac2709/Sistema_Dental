/*
-- PACIENTES
CREATE TABLE pacientes (
  id_paciente SERIAL PRIMARY KEY,
  nombres VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  documento VARCHAR(20),
  fecha_nacimiento DATE,
  sexo CHAR(1),
  telefono VARCHAR(20),
  email VARCHAR(150),
  direccion TEXT,
  alergias TEXT,
  observaciones TEXT
);
*/


import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const Paciente = sequelize.define("Pacientes", {
    pacienteId: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    },
    nombres: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    apellidos: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    documento: {
        type: DataTypes.STRING(10),
        unique: true,
        allowNull: false
    },
    fechaNacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    sexo: {
        type: DataTypes.CHAR(1)
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    },
    telefono: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    direccion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    observaciones: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    alergias: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {timestamps:true})


export default Paciente
