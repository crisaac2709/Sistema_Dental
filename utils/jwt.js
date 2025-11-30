import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const CLAVE_SECRETA = process.env.JWT_SECRET

export const crearToken = (payload) => {
    if (payload == null) {
        return
    }
    return jwt.sign(payload, CLAVE_SECRETA, {"expiresIn":"1d"})
}


