import Tratamiento from "../models/Tratamiento.js"

export const crearTratamiento = async(req, res) => {
    try {
        const {pieza_dental, diagnostico, observaciones, estado, fecha_inicio, fecha_fin, citaId, procedimientoId} = req.body

        if (new Date(fecha_inicio) >= new Date(fecha_fin)) {
            return res.status(400).json({message: "La fecha de inicio debe ser menor que la fecha de finalizacion"})
        }

        const estados = ["Planificado", "En Proceso", "Completado"]

        const estado_encontrado = estados.find(x => x.toLowerCase() === estado.toLowerCase())

        if (!estado_encontrado) return res.status(400).json({message: "Estado enviado no valido"})

        const tratamiento = Tratamiento.build({
            pieza_dental,
            diagnostico,
            observaciones,
            estado: estado_encontrado,
            fecha_inicio,
            fecha_fin,
            citaId,
            procedimientoId
        })

        await tratamiento.save()

        res.status(201).json({
            message: "Tratamiento creado correctamente",
            tratamiento
        })

    } catch(error) {
        res.status(500).json({message: `Algo salio mal al crear el tratamiento : ${error.message}`})
    }
}



export const actualizarEstadoTratamiento = async(req, res) => {
    try {
        const {tratamientoId} = req.params

        const {estado} = req.body

        const estados = ["Planificado", "En Proceso", "Completado"]

        const tratamiento = await Tratamiento.findByPk(tratamientoId)

        if (!tratamiento) return res.status(404).json({message: "Este tratamiento no existe"})
        
        if (!estado) {
            return res.status(400).json({ message: "El estado es requerido" });
        }
        
        const estado_encontrado = estados.find(x => x.toLowerCase().trim() === estado.toLowerCase().trim())
        if (!estado_encontrado) return res.status(400).json({message: "Estado enviado no valido"})

        tratamiento.estado = estado_encontrado ?? tratamiento.estado

        await tratamiento.save()

        res.status(200).json({
            message: "Estado del tratamiento actualizado correctamente",
            estado: tratamiento.estado
        })

    } catch(error) {
        res.status(500).json({message: `Error al actualizar estado de la cita : ${error.message}`})
    }
}


export const obtenerTratamientoPorId = async(req, res) => {
    try {
        const {tratamientoId} = req.params

        const tratamiento = await Tratamiento.findByPk(tratamientoId)
        if (!tratamiento) return res.status(404).json({message: `El tratamiento con Id ${tratamientoId} no existe`})

        res.json({tratamiento})
    } catch(error) {
        res.status(500).json({message: `Error al obtener el tratamiento : ${error.message}`})
    }
}


export const tratamientosDeUnaCita = async(req, res) => {
    try {
        const {citaId} = req.params

        const tratamientos = await Tratamiento.findAll({
            where: {citaId}
        })

        return res.json(tratamientos);
    } catch(error) {
        res.status(500).json({message: `Error al obtener tratamientos de la cita : ${error.message}`})
    }
}