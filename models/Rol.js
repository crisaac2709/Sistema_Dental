import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const Rol = sequelize.define("Roles", {
    rolId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    }
})


export default Rol