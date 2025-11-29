/* 


-- PAGOS
CREATE TABLE pagos (
  id_pago SERIAL PRIMARY KEY,
  id_factura INT NOT NULL,
  fecha_pago TIMESTAMP NOT NULL,
  monto NUMERIC(10,2) NOT NULL,
  metodo_pago VARCHAR(30) NOT NULL,
  referencia VARCHAR(100),
  observaciones TEXT,
  FOREIGN KEY (id_factura) REFERENCES facturas(id_factura)
);

*/

import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Factura from "./Factura.js";

const Pago = sequelize.define("Pagos", {
    pagoId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha_pago: {
        type: DataTypes.DATE,
        defaultValue: Date.now,
        allowNull: false
    },
    monto: {
        type: DataTypes.DECIMAL(10,2),
        defaultValue: 0,
        allowNull: false
    },
    metodo_pago: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    observaciones: DataTypes.TEXT
})

Factura.hasMany(Pago, {
    foreignKey: "facturaId",
    as: "factura_pago"
})

Pago.belongsTo(Factura, {
    foreignKey: "facturaId",
    as: "factura"
})

export default Pago