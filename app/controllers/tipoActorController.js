import TipoActor from '../models/TipoActor.js';
import Entidad from '../models/entidad.js';
import sequelize from '../config/database.js';

// Obtener todos los tipos de actor
export const getAllTiposActor = async (req, res) => {
  try {
    const tiposActor = await TipoActor.findAll({
      where: { activo: true },
      include: [{
        model: Entidad,
        as: 'entidades',
        attributes: ['id', 'razonSocial']
      }]
    });
    res.status(200).json(tiposActor);
  } catch (error) {
    console.error('Error al obtener tipos de actor:', error);
    res.status(500).json({ error: 'Error al obtener los tipos de actor' });
  }
};

// Obtener solo las clases de actor (para selects)
export const getClasesActor = async (req, res) => {
  try {
    const clasesActor = await TipoActor.findAll({
      where: { activo: true },
      attributes: ['id', 'claseActor', 'descripcion'],
      order: [['claseActor', 'ASC']]
    });
    res.status(200).json(clasesActor);
  } catch (error) {
    console.error('Error al obtener clases de actor:', error);
    res.status(500).json({ error: 'Error al obtener las clases de actor' });
  }
};

// Obtener un tipo de actor por ID
export const getTipoActorById = async (req, res) => {
  try {
    const tipoActor = await TipoActor.findByPk(req.params.id, {
      include: [{
        model: Entidad,
        as: 'entidades',
        attributes: ['id', 'razonSocial', 'correo', 'telefono']
      }]
    });

    if (!tipoActor) {
      return res.status(404).json({ error: 'Tipo de actor no encontrado' });
    }

    res.status(200).json(tipoActor);
  } catch (error) {
    console.error('Error al obtener tipo de actor:', error);
    res.status(500).json({ error: 'Error al obtener el tipo de actor' });
  }
};

// Crear nuevo tipo de actor
export const createTipoActor = async (req, res) => {
  try {
    const { claseActor, descripcion } = req.body;

    // Verificar si ya existe
    const existingTipo = await TipoActor.findOne({ where: { claseActor } });
    if (existingTipo) {
      return res.status(400).json({ error: 'Esta clase de actor ya existe' });
    }

    const nuevoTipoActor = await TipoActor.create({
      claseActor,
      descripcion
    });

    res.status(201).json({
      message: 'Tipo de actor creado correctamente',
      tipoActor: nuevoTipoActor
    });
  } catch (error) {
    console.error('Error al crear tipo de actor:', error);
    res.status(500).json({ error: 'Error al crear el tipo de actor' });
  }
};

// Actualizar tipo de actor
export const updateTipoActor = async (req, res) => {
  try {
    const tipoActor = await TipoActor.findByPk(req.params.id);
    if (!tipoActor) {
      return res.status(404).json({ error: 'Tipo de actor no encontrado' });
    }

    const { claseActor, descripcion, activo } = req.body;
    await tipoActor.update({ claseActor, descripcion, activo });

    res.status(200).json({ message: 'Tipo de actor actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar tipo de actor:', error);
    res.status(500).json({ error: 'Error al actualizar el tipo de actor' });
  }
};

// Desactivar tipo de actor (soft delete)
export const deactivateTipoActor = async (req, res) => {
  try {
    const tipoActor = await TipoActor.findByPk(req.params.id);
    if (!tipoActor) {
      return res.status(404).json({ error: 'Tipo de actor no encontrado' });
    }

    // Verificar si tiene entidades asociadas
    const entidadesAsociadas = await Entidad.count({ where: { tipoActorId: tipoActor.id } });
    
    if (entidadesAsociadas > 0) {
      return res.status(400).json({
        error: `No se puede desactivar este tipo de actor porque tiene ${entidadesAsociadas} entidad(es) asociada(s)`
      });
    }

    await tipoActor.update({ activo: false });
    res.status(200).json({ message: 'Tipo de actor desactivado correctamente' });
  } catch (error) {
    console.error('Error al desactivar tipo de actor:', error);
    res.status(500).json({ error: 'Error al desactivar el tipo de actor' });
  }
};

// Obtener estadísticas de tipos de actor
export const getEstadisticasTiposActor = async (req, res) => {
  try {
    const estadisticas = await TipoActor.findAll({
      attributes: [
        'id',
        'claseActor',
        'descripcion',
        [sequelize.fn('COUNT', sequelize.col('entidades.id')), 'cantidadEntidades']
      ],
      include: [{
        model: Entidad,
        as: 'entidades',
        attributes: []
      }],
      group: ['TipoActor.id'],
      where: { activo: true }
    });

    res.status(200).json(estadisticas);
  } catch (error) {
    console.error('Error al obtener estadísticas de tipos de actor:', error);
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
};
