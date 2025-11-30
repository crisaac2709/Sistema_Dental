/*
-- FACTURA DETALLE
CREATE TABLE factura_detalle (
  id_detalle SERIAL PRIMARY KEY,
  id_factura INT NOT NULL,
  id_procedimiento INT NOT NULL,
  id_tratamiento INT,
  descripcion TEXT,
  cantidad INT NOT NULL,
  precio_unitario NUMERIC(10,2) NOT NULL,
  subtotal NUMERIC(10,2) NOT NULL,
  FOREIGN KEY (id_factura) REFERENCES facturas(id_factura),
  FOREIGN KEY (id_procedimiento) REFERENCES procedimientos(id_procedimiento),
  FOREIGN KEY (id_tratamiento) REFERENCES tratamientos(id_tratamiento)
);
*/

import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Factura from "./Factura.js";
import Tratamiento from "./Tratamiento.js";



const DetalleFactura = sequelize.define("DetalleFactura", {
  detalleId: {  
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcion: DataTypes.TEXT,
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    },
    get() {
      const raw = this.getDataValue("precio_unitario")
      return raw ? parseFloat(raw) : null
    }
  },
  subtotal: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    },
    get() {
      const raw = this.getDataValue("subtotal")
      return raw ? parseFloat(raw) : null
    }
  }
})

Factura.hasMany(DetalleFactura, {
  foreignKey: "facturaId",
  as: "detalles_factura"
})

DetalleFactura.belongsTo(Factura, {
  foreignKey: "facturaId",
  as: "factura"
})


Tratamiento.hasMany(DetalleFactura, {
  foreignKey: "tratamientoId",
  as: "detalles_tratamiento"
})

DetalleFactura.belongsTo(Tratamiento, {
  foreignKey: "tratamientoId",
  as: "tratamiento"
})

export default DetalleFactura
