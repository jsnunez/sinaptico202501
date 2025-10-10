import express from 'express';
import Proyectos from '../models/proyectos.js';
import User from '../models/user.js';
import Entidad from '../models/entidad.js';

const router = express.Router();

// Obtener proyectos de un usuario
export const getMisProyectos = async (req, res) => {
    try {
        const proyectos = await Proyectos.findAll({
            where: { userLiderId: req.params.userId },
            include: [
                { model: User, as: 'usuario' },
                { model: Entidad, as: 'entidad' }
            ]
        });
        if (!proyectos) return res.status(404).json({ error: 'Proyectos no encontrados' });
        res.json(proyectos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los proyectos
export const getProyectos = async (_, res) => {
    try {
        const proyectos = await Proyectos.findAll({
            include: [
                { model: User, as: 'usuario' },
                { model: Entidad, as: 'entidad' }
            ]
        });
        res.json(proyectos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un proyecto por ID
export const getProyectoById = async (req, res) => {
    try {
        const proyecto = await Proyectos.findByPk(req.params.id, {
            include: [
                { model: User, as: 'usuarioLider' },
                { model: Entidad, as: 'entidad' }
            ]
        });
        if (!proyecto) return res.status(404).json({ error: 'Proyecto no encontrado' });
        res.json(proyecto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo proyecto
export const createProyecto = async (req, res) => {
    try {
        const nuevoProyecto = await Proyectos.create(req.body);
        res.status(201).json(nuevoProyecto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar un proyecto
export const updateProyecto = async (req, res) => {
    try {
        const [updated] = await Proyectos.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updated) return res.status(404).json({ error: 'Proyecto no encontrado' });
        const proyectoActualizado = await Proyectos.findByPk(req.params.id);
        res.json(proyectoActualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un proyecto
export const deleteProyecto = async (req, res) => {
    try {
        const deleted = await Proyectos.destroy({
            where: { id: req.params.id }
        });
        if (!deleted) return res.status(404).json({ error: 'Proyecto no encontrado' });
        res.json({ message: 'Proyecto eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Importa Op desde sequelize
import { Op } from 'sequelize';
// o en CommonJS:
// const { Op } = require('sequelize');

export const getProyectosDeMiEntidadOCreadosPorMi = async (req, res) => {
  try {
    let { userId, entidadId } = req.params;

    // Normaliza tipos
    const userIdNum = Number(userId);
    const entidadIdNum = Number(entidadId);

    // Construye el where dinámicamente
    const orConds = [{ userLiderId: userIdNum }];

    // Solo filtra por entidad si viene un número válido
    if (!Number.isNaN(entidadIdNum)) {
      orConds.push({ entidadId: entidadIdNum });
    }

    const proyectos = await Proyectos.findAll({
      where: { [Op.or]: orConds },
      include: [
        { model: User, as: 'usuario' },
           // Usuario líder del proyecto (userLiderId)
        { model: User, as: 'usuarioLider' },
        { model: Entidad, as: 'entidad' }
      ],
      order: [['createdAt', 'DESC']]
    });

    // En vez de 404, devolvemos lista vacía
    return res.json(proyectos || []);
  } catch (error) {
    console.error('getProyectosDeMiEntidadOCreadosPorMi error:', error);
    return res.status(500).json({ error: error.message });
  }
};
