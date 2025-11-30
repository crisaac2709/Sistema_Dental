/*
-- HISTORIAS CLÍNICAS
CREATE TABLE historias_clinicas (
  id_historia SERIAL PRIMARY KEY,
  id_paciente INT NOT NULL,
  fecha_apertura DATE NOT NULL,
  motivo_consulta_inicial TEXT,
  antecedentes_personales TEXT,
  antecedentes_familiares TEXT,
  habitos TEXT,
  observaciones_generales TEXT,
  FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente)
);
*/

import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

import Paciente from "./Paciente.js"

const HistoriaClinica = sequelize.define("HistoriaClinica", {
  historiaId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fechaApertura: {
    type: DataTypes.DATE,
    allowNull: false
  },
  motivoConsultaInicial: DataTypes.TEXT,
  antecedentesPersonales: DataTypes.TEXT,
  antecedentesFamiliares: DataTypes.TEXT,
  habitos: DataTypes.TEXT,
  observacionesGenerales: DataTypes.TEXT,
}, { timestamps:true })

Paciente.hasMany(HistoriaClinica, {
  foreignKey: "pacienteId",
  as: "historia_clinica_paciente",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

HistoriaClinica.belongsTo(Paciente, {
  foreignKey: "pacienteId",
  as: "paciente"
})

export default HistoriaClinica