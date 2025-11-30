import { Router } from "express";
import { crearHistoria, eliminarHistoria, obtenerHistoriaPorId, obtenerHistorias } from "../controllers/historia.controller.js";
import {verificarToken} from "../middlewares/verificar_token.js"
import {verificarRol} from "../middlewares/verificar_rol.js"

const router = Router()

router.get("/", verificarToken, verificarRol("Admin", "Odontologo"), obtenerHistorias)
router.get("/:historiaId", verificarToken, verificarRol("Admin", "Odontologo"), obtenerHistoriaPorId)
router.post("/", verificarToken, verificarRol("Admin", "Odontologo"), crearHistoria)
router.delete("/:historiaId", verificarToken, verificarRol("Admin"), eliminarHistoria)

export default router