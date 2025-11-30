import express from "express"
import morgan from "morgan"
import cors from "cors"

import usuarioRoutes from "./routes/usuario.routes.js"
import odontologoRoutes from "./routes/odontologo.routes.js"
import pacienteRoutes from "./routes/paciente.routes.js"
import historiaRoutes from "./routes/historia.routes.js"

const app = express()

app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

// Rutas
app.use("/usuario", usuarioRoutes)
app.use("/odontologo", odontologoRoutes)
app.use("/paciente", pacienteRoutes)
app.use("/historia", historiaRoutes)

export default app