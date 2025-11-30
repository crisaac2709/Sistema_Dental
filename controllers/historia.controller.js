import HistoriaClinica from "../models/HistoriaClinica.js";
import Paciente from "../models/Paciente.js";

export const crearHistoria = async(req, res) => {
    try {
        const {motivoConsultaInicial, antecedentesPersonales, antecedentesFamiliares, habitos, observacionesGenerales, pacienteId} = req.body
        const fecha_apertura = Date.now()

        const historia = HistoriaClinica.build({
            pacienteId,
            fechaApertura: fecha_apertura,
            motivoConsultaInicial, 
            antecedentesFamiliares,
            antecedentesPersonales,
            habitos,
            observacionesGenerales
        })

        await historia.save()

        res.status(201).json({
            message: "Historia clinica creada correctamente",
            historia
        })
    } catch(error) {
        res.status(500).json({message: `Error al crear historia clinica: ${error.message}`})
    }
}

export const obtenerHistorias = async(req, res) => {
    const historias = await HistoriaClinica.findAll()
    res.json(historias)
}

export const obtenerHistoriaPorId = async(req, res) => {
    try {
        const {historiaId} = req.params
        const historia = await HistoriaClinica.findByPk(historiaId, {
            include: {
                model: Paciente, as: "paciente",  attributes: ["nombres", "apellidos", "telefono"]
            }
        })
        if (!historia) return res.status(404).json({message: "Historia clinica no existe"})        
        res.json(historia)
    } catch(error) {
        res.status(500).json({message: `Error al obtener historia clinica: ${error.message}`})
    }
}


export const eliminarHistoria = async(req, res) => {
    try {
        const {historiaId} = req.params
        const historia = await HistoriaClinica.findByPk(historiaId)
        if (!historia) return res.status(404).json({message: "No existe esa historia clinica"})

        await historia.destroy()

        res.status(200).json({
            message: "Historia clinica eliminada correctamente"
        })
    } catch(error) {
        res.status(500).json({message: `Error al intentar eliminar historia clinica: ${error.message}`})
    }
}