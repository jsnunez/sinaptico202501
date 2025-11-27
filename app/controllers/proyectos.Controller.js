import express from 'express';
import Proyectos from '../models/proyectos.js';
import User from '../models/user.js';
import Entidad from '../models/entidad.js';
import AliadosProyectosAplicados from '../models/aliadosProyectosAplicados.js';
import ConvocatoriaProyectos from '../models/convocatoriaProyectos.js';
import Convocatoria from '../models/convocatoria.js';

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
                { 
                    model: User, 
                    as: 'usuario' 
                },
                { 
                    model: Entidad, 
                    as: 'entidad' 
                },
                {
                    model: ConvocatoriaProyectos,
                    as: 'convocatoriasAplicadas',
                    include: [
                        {
                            model: Convocatoria,
                            as: 'convocatoria',
                            attributes: ['id','numero' ,'nombre', 'titulo', 'descripcion', 'fechaApertura', 'fechaCierre', 'estado']
                        }
                    ]
                }
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
                { 
                    model: User, 
                    as: 'usuarioLider' 
                },
                { 
                    model: Entidad, 
                    as: 'entidad' 
                },
                {
                    model: ConvocatoriaProyectos,
                    as: 'convocatoriasAplicadas',
                    include: [
                        {
                            model: Convocatoria,
                            as: 'convocatoria',
                            attributes: ['id','numero' ,'nombre', 'titulo', 'descripcion', 'fechaApertura', 'fechaCierre', 'estado']
                        }
                    ]
                }
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
        // Crear registros de aliados aplicados si vienen en el body
        if (req.body.postulacion && Array.isArray(req.body.postulacion)) {
            console.log('Creando aliados aplicados:', req.body.postulacion);
            for (const aliadoId of req.body.postulacion) {
            await AliadosProyectosAplicados.create({
                proyectoId: nuevoProyecto.id,
                aliadoProyectoId: aliadoId
            });
            }
        }
      
        console.log('Proyecto creado:', req.body);
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
import AliadosProyectos from '../models/aliadosProyectos.js';
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
        { model: User, as: 'usuario',attributes: ['name'] },
        { model: User, as: 'usuarioLider',attributes: ['name'] },
        { model: Entidad, as: 'entidad',attributes: ['razonSocial'] },
        {
          model: ConvocatoriaProyectos,
          as: 'convocatoriasAplicadas',
          include: [
            {
              model: Convocatoria,
              as: 'convocatoria',
              attributes: ['id','numero' ,'nombre', 'titulo', 'descripcion', 'fechaApertura', 'fechaCierre', 'estado']
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    // Consulta los aliados aplicados por separado
    const proyectosIds = proyectos.map(p => p.id);
    const aliadosAplicados = await AliadosProyectosAplicados.findAll({
      where: { proyectoId: proyectosIds },
      include: [{
        model: AliadosProyectos,
        as: 'aliadoProyecto',
        attributes: ['nombreAliado']
      }]
    });

    // Agregar los aliados a cada proyecto
    proyectos.forEach(proyecto => {
      proyecto.dataValues.aliadosAplicados = aliadosAplicados.filter(
        a => a.proyectoId === proyecto.id
      );
    });

    // En vez de 404, devolvemos lista vacía
    return res.json(proyectos || []);
  } catch (error) {
    console.error('getProyectosDeMiEntidadOCreadosPorMi error:', error);
    return res.status(500).json({ error: error.message });
  }
};
