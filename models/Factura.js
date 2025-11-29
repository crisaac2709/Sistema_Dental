/*

-- FACTURAS
CREATE TABLE facturas (
  id_factura SERIAL PRIMARY KEY,
  id_paciente INT NOT NULL,
  id_cita INT,
  fecha_emision TIMESTAMP NOT NULL,
  subtotal NUMERIC(10,2) NOT NULL,
  impuestos NUMERIC(10,2) NOT NULL,
  total NUMERIC(10,2) NOT NULL,
  estado VARCHAR(20) NOT NULL,
  id_usuario_crea INT NOT NULL,
  FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente),
  FOREIGN KEY (id_cita) REFERENCES citas(id_cita),
  FOREIGN KEY (id_usuario_crea) REFERENCES usuarios(id_usuario)
);

*/

import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Usuario from "./Usuario.js";
import Paciente from "./Paciente.js";
import Cita from "./Cita.js"


const Factura = sequelize.define("Facturas", {
  facturaId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha_emision: {
    type: DataTypes.DATE,
    defaultValue: Date.now,
  },
  subtotal:{
    type: DataTypes.DECIMAL(10,2),
    defaultValue: 0,
    allowNull: false
  },
  impuestos:{
    type: DataTypes.DECIMAL(10,2),
    defaultValue: 0,
    allowNull: false
  },
  total:{
    type: DataTypes.DECIMAL(10,2),
    defaultValue: 0,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING(25),
    allowNull: false
  }
})

Usuario.hasMany(Factura, {
  foreignKey: "usuarioId",
  as: "facturas_creadas"
})

Factura.belongsTo(Usuario, {
  foreignKey: "usuarioId",
  as: "usuario_creador"
})

Paciente.hasMany(Factura, {
  foreignKey: "pacienteId",
  as: "facturas_paciente"
})

Factura.belongsTo(Paciente, {
  foreignKey: "pacienteId",
  as: "paciente"
})

Cita.hasMany(Factura, {
  foreignKey: "citaId",
  as: "facturas_cita"
})

Factura.belongsTo(Cita, {
  foreignKey: "citaId",
  as: "cita"
})

export default Factura