import { Op } from "sequelize"
import Cita from "../models/Cita.js"
import Odontologo from "../models/Odontologo.js"
import Paciente from "../models/Paciente.js"
import HistoriaClinica from "../models/HistoriaClinica.js"

export const crearCita = async(req, res) => {
    try {
        const {pacienteId, odontologoId, fechaHoraInicio, fechaHoraFin, estado, motivo, notas} = req.body
        const {usuarioId} = req.user

        const estados = ["Pendiente", "Confirmada", "Atendida", "Cancelada", "No asistio"]

        if (new Date(fechaHoraInicio) >= new Date(fechaHoraFin)) {
            return res.status(400).json({
                message: "La fecha de inicio debe ser menor que la fecha de finalizacion"
            })
        }

        const historia = await HistoriaClinica.findOne({pacienteId})

        console.log(historia);

        if (!historia) {
            return res.status(404).json({message: "El paciente aun no tiene historia clinica"})
        }

        const citaCruzada = await Cita.findOne({
            where: {
                odontologoId,
                [Op.and]: [
                    {
                        fechaHoraInicio: { [Op.lt]: fechaHoraFin}
                    },
                    {
                        fechaHoraFin: { [Op.gt]: fechaHoraInicio}
                    }
                ]
            }
        })

        if (citaCruzada) {
            return res.status(400).json({
                message: "El odontologo ya tiene una cita asignada en ese horario",
                conflicto: citaCruzada
            })
        }

        const estado_encontrado = estados.find(x => x.toLowerCase().trim() === estado.toLowerCase().trim())

        if (!estado_encontrado) return res.status(400).json({message: "Estado enviado no valido"})

        console.log(`El estado encontrado fue: ${estado_encontrado}`);

        const cita = Cita.build({
            usuarioId,
            historiaId: historia.historiaId,
            odontologoId,
            pacienteId,
            fechaHoraInicio,
            fechaHoraFin,
            estado: estado_encontrado,
            motivo,
            notas
        })

        await cita.save()

        return res.status(201).json({
            message: "Cita creada correctamente",
            cita
        })
        
    } catch(error) {
        res.status(500).json({message: `Algo salio mal al crear la cita : ${error.message}`})
    }
}


export const obtenerCitasPorOdontologo = async(req, res) => {
    try {
        const {usuarioId} = req.user
        console.log("el user id es :", usuarioId);
        const odontologo = await Odontologo.findOne({
            where: {
                usuarioId
            }
        })

        if (!odontologo) return res.status(404).json({message: "No eres odontologo"})

        const citas = await Cita.findOne({
            where: {
                odontologoId: odontologo.odontologoId
            }
        })

        if (!citas) return res.status(404).json({message: "No tienes citas"})
        
        res.json({citas})


    } catch(error) {
        res.status(500).json({message: `Error al obtener las citas : ${error.message}`})
    }
}


export const eliminarCita = async(req, res) => {
    try {
        const {citaId} = req.params

        const {usuarioId} = req.user

        const odontologo = await Odontologo.findOne({
            where: {
                usuarioId
            }
        })

        if (!odontologo) return res.status(403).json({message: "No tienes permitido borrar esta cita"})

        const cita = await Cita.findOne({
            where: {
                citaId,
                odontologoId: odontologo.odontologoId
            }
        })

        if (!cita) return res.status(404).json({message: "Cita no existente o no eres autorizado para eliminarla"})

        await cita.destroy() 

        res.status(200).json({message: "Cita eliminada correctamente"})
    } catch(error) {
        res.status(500).json({message: `Error al eliminar la cita : ${error.message}`})
    }
}


