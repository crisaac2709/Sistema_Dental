import { Router } from "express";
import { crearTratamiento, actualizarEstadoTratamiento, obtenerTratamientoPorId, tratamientosDeUnaCita } from "../controllers/tratamiento.controller.js";
import {verificarRol} from "../middlewares/verificar_rol.js"
import {verificarToken} from "../middlewares/verificar_token.js"


const router = Router()

router.post("/", verificarToken, verificarRol("Admin", "Odontologo"), crearTratamiento)
router.get("/:tratamientoId", verificarToken, verificarRol("Admin", "Odontologo"), obtenerTratamientoPorId)
router.get("/cita/:citaId", verificarToken, verificarRol("Admin", "Odontologo"), tratamientosDeUnaCita)
router.patch("/:procedimientoId/estado", verificarToken, verificarRol("Admin", "Odontologo"), actualizarEstadoTratamiento)

export default router