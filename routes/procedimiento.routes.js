import { Router } from "express";
import { crearProcedimiento, obtenerProcedimientos, obtenerProcedimientoPorId, eliminarProcedimiento, actualizarProcedimiento } from "../controllers/procedimiento.controller.js";
import {verificarRol} from "../middlewares/verificar_rol.js"
import {verificarToken} from "../middlewares/verificar_token.js"


const router = Router()

router.post("/", verificarToken, verificarRol("Admin", "Odontologo"), crearProcedimiento)
router.get("/", verificarToken, verificarRol("Admin", "Odontologo"), obtenerProcedimientos)
router.get("/:procedimientoId", verificarToken, verificarRol("Admin", "Odontologo"), obtenerProcedimientoPorId)
router.delete("/:procedimientoId", verificarToken, verificarRol("Admin"), eliminarProcedimiento)
router.put("/:procedimientoId", verificarToken, verificarRol("Admin", "Odontologo"), actualizarProcedimiento)

export default router