import Procedimiento from "../models/Procedimiento.js";
import {v4 as uuidv4} from "uuid"

export const crearProcedimiento = async(req, res) => {
    try {
        const {nombre, descripcion, duracionEstimadaMinutos, precioBase} = req.body

        const codigo = uuidv4().slice(0, 6)
        console.log(codigo);

        const procedimiento = Procedimiento.build({
            nombre,
            descripcion, 
            duracionEstimadaMinutos, 
            codigo,
            precioBase
        })
        await procedimiento.save()

        res.status(201).json({
            message: "Procedimiento creado correctamente",
            procedimiento
        })

    } catch(error) {
        res.status(500).json({message: `Algo salio mal al crear el procedimiento : ${error.message}`})
    }
}


export const obtenerProcedimientos = async(req, res) => {
    const procedimientos = await Procedimiento.findAll()
    res.json({procedimientos})
}

export const obtenerProcedimientoPorId = async(req, res) => {
    try {
        const {procedimientoId} = req.params
        const procedimiento = await Procedimiento.findByPk(procedimientoId)

        if (!procedimiento) return res.status(404).json({message: `Ese procedimiento no existe`})

        res.json({procedimiento})
    } catch(error) {
        res.status(500).json({message: `Error al obtener el procedimiento : ${error.message}`})
    }
}

export const eliminarProcedimiento = async(req, res) => {
    try {
        const {procedimientoId} = req.params
        const procedimiento = await Procedimiento.findByPk(procedimientoId)

        if (!procedimiento) return res.status(404).json({message: `Ese procedimiento no existe`})

        await procedimiento.destroy()

        res.status(200).json({message: "Procedimiento eliminado correctamente"})
    } catch(error) {
        res.status(500).json({message: `Algo salio mal al eliminar el procedimiento : ${error.message}`})
    }
}

export const actualizarProcedimiento = async(req, res) => {
    try {
        const {procedimientoId} = req.params
        const {nombre, descripcion, duracionEstimadaMinutos, precioBase} = req.body

        const procedimiento = await Procedimiento.findByPk(procedimientoId)

        procedimiento.nombre = nombre ?? procedimiento.nombre
        procedimiento.descripcion = descripcion ?? procedimiento.descripcion
        procedimiento.duracionEstimadaMinutos = duracionEstimadaMinutos ?? procedimiento.duracionEstimadaMinutos
        procedimiento.precioBase = precioBase ?? procedimiento.precioBase

        await procedimiento.save()

        res.status(200).json({
            message: "Procedimiento actualizado correctamente",
            procedimiento
        })

    } catch(error) {
        res.status(500).json({message: `Algo salio mal al actualizar el procedimiento : ${error.message}`})
    }
}