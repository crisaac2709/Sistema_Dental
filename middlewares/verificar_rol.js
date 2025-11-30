
export const verificarRol = (...rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({message: "No autenticado aun"})
        }

        const rolUsuario = req.user.rolNombre 
        const resultado = rolesPermitidos.includes(rolUsuario)

        if (!resultado) return res.status(403).json({message: "No tienes acceso"})
        next()
    }
}