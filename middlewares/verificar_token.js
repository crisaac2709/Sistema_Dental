import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const verificarToken = async(req, res, next) => {
    try {
        const header = req.headers["authorization"]
        if (!header) return res.status(401).json({ message: "No token" })
        
        const token = header.split(" ")[1]
        if (!token) return res.status(500).json({message: "Token no proporcionado"})

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch(error) {
        return res.status(401).json({ message: "Token inválido" })
    }
}