import { Router } from "express";
import { crearCita, obtenerCitasPorOdontologo, eliminarCita, actualizarEstadoCita } from "../controllers/cita.controller.js";
import {verificarToken} from "../middlewares/verificar_token.js"
import {verificarRol} from "../middlewares/verificar_rol.js"

const router = Router()


router.post("/", verificarToken, verificarRol("Admin", "Odontologo"), crearCita)
router.get("/odontologos", verificarToken, verificarRol("Admin", "Odontologo"), obtenerCitasPorOdontologo)
router.delete("/:citaId", verificarToken, verificarRol("Admin", "Odontologo"), eliminarCita)
router.patch("/estado/:citaId", verificarToken, verificarRol("Admin", "Odontologo"), actualizarEstadoCita)


export default router