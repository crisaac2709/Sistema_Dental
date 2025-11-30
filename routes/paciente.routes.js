import { Router } from "express"
import {verificarRol} from "../middlewares/verificar_rol.js"
import {verificarToken} from "../middlewares/verificar_token.js"
import { crearPaciente, actualizarPaciente, eliminarPaciente, obtenerPacientePorId, obtenerPacientes } from "../controllers/paciente.controller.js"

const router = Router()

router.get("/", verificarToken, verificarRol("Admin","Odontologo"), obtenerPacientes)
router.get("/:pacienteId", verificarToken, verificarRol("Admin","Odontologo"), obtenerPacientePorId)
router.post("/", verificarToken, verificarRol("Admin","Odontologo"), crearPaciente)
router.put("/:pacienteId", verificarToken, verificarRol("Admin","Odontologo"), actualizarPaciente)
router.get("/:pacienteId", verificarToken, verificarRol("Admin"), eliminarPaciente)


export default router