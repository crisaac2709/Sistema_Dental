/*
-- CITAS
CREATE TABLE citas (
  id_cita SERIAL PRIMARY KEY,
  id_paciente INT NOT NULL,
  id_odontologo INT NOT NULL,
  id_historia INT,
  fecha_hora_inicio TIMESTAMP NOT NULL,
  fecha_hora_fin TIMESTAMP,
  estado VARCHAR(20) NOT NULL,
  motivo TEXT,
  notas TEXT,
  id_creado_por INT,
  FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente),
  FOREIGN KEY (id_odontologo) REFERENCES odontologos(id_odontologo),
  FOREIGN KEY (id_historia) REFERENCES historias_clinicas(id_historia),
  FOREIGN KEY (id_creado_por) REFERENCES usuarios(id_usuario)
);
*/


import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

import Odontologo from "./Odontologo.js"
import Paciente from "./Paciente.js";
import HistoriaClinica from "./HistoriaClinica.js"
import Usuario from "./Usuario.js";

const Cita = sequelize.define("Citas", {
  citaId: {
      type: DataTypes.INTEGER, 
      primaryKey: true,
      autoIncrement: true
  },
  fechaHoraInicio: {
    type: DataTypes.DATE,
    allowNull: false
  }, 
  fechaHoraFin: {
    type: DataTypes.DATE,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING(25),
    allowNull: false
  },
  motivo: DataTypes.TEXT,
  notas: DataTypes.TEXT
}, {timestamps:true})

// Relacion paciente con citas
Paciente.hasMany(Cita, {
  foreignKey: "pacienteId",
  as: "citas_paciente",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

Cita.belongsTo(Paciente, {
  foreignKey: "pacienteId",
  as: "paciente"
})

// Relacion odontologo con citas
Odontologo.hasMany(Cita, {
  foreignKey: "odontologoId",
  as: "citas_odontologo",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

Cita.belongsTo(Odontologo, {
  foreignKey: "odontologoId",
  as: "odontologo"
})

// Relacion historia clinica con citas
HistoriaClinica.hasMany(Cita, {
  foreignKey: "historiaId",
  as: "citas",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

Cita.belongsTo(HistoriaClinica, {
  foreignKey: "historiaId",
  as: "historia"
})

// Relacion usuario con citas
Usuario.hasMany(Cita, {
  foreignKey: "usuarioId",
  as: "citas_usuario",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

Cita.belongsTo(Usuario, {
  foreignKey: "usuarioId",
  as: "usuario"
})

export default Cita