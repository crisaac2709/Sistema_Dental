import { sequelize } from "../config/db.js";
import { DataTypes} from "sequelize";

import Rol from "./Rol.js"

const Usuario = sequelize.define("Usuarios", {
    usuarioId: {
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
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {timestamps:true})


Rol.hasMany(Usuario, {
    foreignKey: "rolId",
    as: "usuarios"
})
Usuario.belongsTo(Rol, {
    foreignKey: "rolId",
    as: "rol"
})


export default Usuario