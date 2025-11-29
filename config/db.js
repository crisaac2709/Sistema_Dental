import dotenv from "dotenv"
dotenv.config()

import {Sequelize} from "sequelize"

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.USER,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        dialect: process.env.DIALECT,
        port: process.env.PORT_DB
    }
) 

