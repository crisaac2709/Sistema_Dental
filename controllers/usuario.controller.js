import { json } from "sequelize"
import Usuario from "../models/Usuario.js"
import { crearToken } from "../utils/jwt.js"
import bcrypt from "bcryptjs"
import Rol from "../models/Rol.js"

export const register = async (req, res) => {
    try {
        const {nombres, apellidos, email, username, password, rolId} = req.body

        const rol_encontrado = await Rol.findByPk(rolId)

        if (!rol_encontrado) return res.status(404).json({message: "Rol no encontrado"})

        const usuario_existente = await Usuario.findOne({where: {email}})

        if (usuario_existente) return res.status(400).json({message: "Este usuario ya existe"})

        const password_hashed = await bcrypt.hash(password, 10)

        const usuario_creado = Usuario.build({
            nombres,
            apellidos,
            email,
            username,
            password: password_hashed,
            rolId
        })

        await usuario_creado.save()

        res.status(201).json({
            message: "Usuario creado correctamente",
            usuario: {
                id: usuario_creado.id,
                nombres: usuario_creado.nombres,
                apellidos: usuario_creado.apellidos,
                email: usuario_creado.email,
                username: usuario_creado.username            
            }
        })

    } catch(error) {
        res.status(500).json({message: `Error el registar el usuario: ${error}`})
    }
}

export const login = async (req, res) => {
    try {
        const {username, password} = req.body

        const usuario = await Usuario.findOne({
            where: {username},
            include: {
                model: Rol,
                as: "rol"
            }
        })

        if (!usuario || !usuario.activo) return res.status(401).json({message: "Usuario inactivo o credenciales inválidas"})
        
        const comparar_password = await bcrypt.compare(password, usuario.password)

        if (!comparar_password) return res.status(400).json({message: "Credenciales invalidas"})

        console.log(`Este es el nombre del rol: ${usuario.rol.nombre}`)

        const payload = {
            usuarioId: usuario.usuarioId,
            rolId: usuario.rolId,
            rolNombre: usuario.rol.nombre
        }

        const token = crearToken(payload)

        res.status(200).json({
            message: "Inicio de sesion correcto",
            token
        })
    } catch(error) {
        res.status(500).json({message: `Error al intentar iniciar sesion: ${error}`})
    }
}


export const profile = async(req, res) => {
    try {
        res.json({
            message: "Bienvenido al perfil",
            datos: req.user
        })
    } catch(error) {
        res.status(500).json({message: `Algo salio mal: ${error}`})
    }
}


export const obtenerUsuarios = async(req, res) => {
    const users = await Usuario.findAll({ attributes: {exclude: ["password"]}, include: {
        model: Rol,
        as: "rol",
        attributes: ["nombre"]
    }})
    res.json(users)
}

export const obtenerUsuarioPorId = async(req, res) => {
    try {
        const {usuarioId} = req.params
        const usuario = await Usuario.findByPk(usuarioId, {
            attributes: {
                exclude: ["password"]
            }, 
            include: {
                model: Rol,
                as: "rol",
                attributes: ["nombre"]
            }
        })

        if (!usuario) return res.status(404).json({message: "Ese usuario no existe"})
        res.json(usuario)
    } catch(error) {
        res.status(500).json({message: `Algo salio mal al obtener usuario: ${error.message}`})
    }
}
