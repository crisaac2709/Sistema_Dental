import { Router } from "express";
import { crearFactura } from "../controllers/factura.controller.js";
import {verificarToken} from "../middlewares/verificar_token.js"
import {verificarRol} from "../middlewares/verificar_rol.js"

const router = Router()


router.post("/", verificarToken, verificarRol("Admin", "Odontologo"), crearFactura)


export default router