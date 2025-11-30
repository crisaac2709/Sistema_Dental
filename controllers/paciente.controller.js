import Paciente from "../models/Paciente.js"

export const crearPaciente = async(req, res) => {
    try {

        const {nombres, apellidos, documento, fechaNacimiento, sexo, email, telefono, direccion, observaciones, alergias} = req.body
        
        const sexos = ["M", "F"]

        if (!sexos.includes(sexo)) return res.status(400).json({message: "Opcion de sexo invalida"})

        const paciente = Paciente.build({
            nombres, 
            apellidos,
            documento,
            fechaNacimiento,
            email,
            telefono,
            observaciones,
            alergias,
            sexo,
            direccion
        })

        await paciente.save()

        res.status(201).json({paciente})
    } catch(error) {
        res.status(500).json({message: `Error al crear paciente: ${error}`})
    }
}


export const eliminarPaciente = async(req, res) => {
    try {
        const {pacienteId} = req.params

        const paciente = await Paciente.findByPk(pacienteId)
        if (!paciente) return res.status(404).json({message: "El paciente no existe"})
        
        await paciente.destroy()

        res.status(200).json({message: "Paciente eliminado correctamente"})
    } catch(error) {
        res.status(500).json({message: `Error al eliminar paciente: ${error}`})
    }
}

export const obtenerPacientes = async(req, res) => {
    const pacientes = await Paciente.findAll()
    res.json({pacientes})
}

export const obtenerPacientePorId = async (req, res) => {
    try {
        const {pacienteId} = req.params

        const paciente = await Paciente.findByPk(pacienteId)
        if (!paciente) return res.status(404).json({message: "El paciente no existe"})

        return res.json({paciente})
    } catch(error) {
        res.status(500).json({message: `Error al obtener paciente: ${error}`})
    }
}


export const actualizarPaciente = async(req, res) => {
    try {
        const {pacienteId} = req.params
        const {nombres, apellidos, documento, fechaNacimiento, sexo, email, telefono, direccion, observaciones, alergias} = req.body
        
        const paciente = await Paciente.findByPk(pacienteId)
        if (!paciente) return res.status(404).json({message: "El paciente no existe"})

        paciente.nombres = nombres ?? paciente.nombres
        paciente.apellidos = apellidos ?? paciente.apellidos
        paciente.documento = documento ?? paciente.documento
        paciente.fechaNacimiento = fechaNacimiento ?? paciente.fechaNacimiento
        paciente.sexo = sexo ?? paciente.sexo;
        paciente.email = email ?? paciente.email;
        paciente.telefono = telefono ?? paciente.telefono;
        paciente.direccion = direccion ?? paciente.direccion;
        paciente.observaciones = observaciones ?? paciente.observaciones;
        paciente.alergias = alergias ?? paciente.alergias;
        
        await paciente.save()

        res.json({ message: "Paciente actualizado correctamente", paciente });

    } catch(error) {
        res.status(500).json({message: `Error al actualizar paciente: ${error}`})
    }
}