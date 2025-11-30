import { Router } from "express";
import { login, register, profile, obtenerUsuarios, obtenerUsuarioPorId } from "../controllers/usuario.controller.js";
import { verificarToken } from "../middlewares/verificar_token.js";
import { verificarRol } from "../middlewares/verificar_rol.js";

const router = Router()

router.post("/registro", register)
router.post("/login", login)
router.get("/perfil", verificarToken, profile)
router.get("/",verificarToken, verificarRol("Admin"), obtenerUsuarios)
router.get("/:usuarioId", verificarToken, verificarRol("Admin"), obtenerUsuarioPorId)

export default router