import app from './app.js'
import dotenv from "dotenv"
import { sequelize } from './config/db.js'

dotenv.config()

const PORT = process.env.PORT

// Importar modelos
import models from "./utils/cargarModelos.js"

async function main() {
    try {
        await sequelize.authenticate()
        console.log('✅ DB conectada correctamente.')
        await sequelize.sync({alter:true})
        console.log('All models were synchronized successfully.');
        app.listen(PORT, ()=>{
            console.log(`Servidor corriendo en http://localhost:${PORT}`)
        })
    } catch(error) {
        console.error(error)
    }
}

main()