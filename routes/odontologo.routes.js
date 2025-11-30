import { Router } from "express"
import {verificarRol} from "../middlewares/verificar_rol.js"
import {verificarToken} from "../middlewares/verificar_token.js"
import { crearOdontologo, desactivarOdontologo, obtenerOdontologos } from "../controllers/odontologo.controller.js"

const router = Router()

router.post("/", verificarToken, verificarRol("Admin"), crearOdontologo)
router.patch("/desactivar/:odontologoId", verificarToken, verificarRol("Admin"), desactivarOdontologo)
router.get("/", verificarToken, verificarRol("Admin"), obtenerOdontologos)

export default router