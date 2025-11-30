import Odontologo from "../models/Odontologo.js";
import Usuario from "../models/Usuario.js";
import { v4 as uuiv4 } from "uuid";

export const crearOdontologo = async (req, res) => {
  try {
    const { usuarioId, especialidad, telefono } = req.body;

    const usuario = await Usuario.findByPk(usuarioId);

    if (!usuario)
      return res.status(404).json({ message: "Este usuario no existe" });

    const codigo_registro = uuiv4().slice(0, 6);

    const odontologo_existente = await Odontologo.findOne({
      where: {
        usuarioId: usuario.usuarioId,
      },
    });

    if (odontologo_existente)
      return res.status(400).json({ message: "Este odontologo ya existe" });

    const odontologo = Odontologo.build({
      especialidad,
      numeroRegistro: codigo_registro,
      telefono,
      usuarioId,
    });

    await odontologo.save();

    res.status(201).json({
      message: "Odontologo creado correctamente",
      odontologo,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error al intentar crear un odontologo: ${error}` });
  }
};

export const desactivarOdontologo = async (req, res) => {
  try {
    const { odontologoId } = req.params;

    if (!odontologoId) {
      return res.status(400).json({ message: "No se ha proporcionado un ID" });
    }

    const odontologo = await Odontologo.findByPk(odontologoId, {
      include: {
        model: Usuario,
        as: "usuario",
      },
    });

    if (!odontologo) {
      return res.status(404).json({ message: "Odontólogo no encontrado" });
    }

    if (odontologo.usuario) {
      await odontologo.usuario.update({ activo: false });
    }

    return res.json({ message: "Odontólogo desactivado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: `Error al desactivar: ${error}` });
  }
};

export const obtenerOdontologos = async (req, res) => {
  const odontologos = await Odontologo.findAll({
    include: {
      model: Usuario,
      as: "usuario",
      attributes: ["nombres", "apellidos"],
    },
  });
  res.json(odontologos);
};
