import UbicacionEntidad from '../models/ubicacionEntidad.js';
import Entidad from '../models/entidad.js';
import Ciudad from '../models/ciudad.js';
import { Op } from 'sequelize';

// Obtener todas las ubicaciones de entidades
export const obtenerTodasLasUbicaciones = async (req, res) => {
  try {
    const ubicaciones = await UbicacionEntidad.findAll({
      include: [
        {
          model: Entidad,
          as: 'entidad',
          include: [
            {
              model: Ciudad,
              attributes: ['nombre', 'departamentoId']
            }
          ]
        }
      ],
      where: {
        activa: true
      }
    });

    res.status(200).json(ubicaciones);
  } catch (error) {
    console.error('Error al obtener ubicaciones:', error);
    res.status(500).json({ error: 'Error al obtener las ubicaciones de entidades' });
  }
};

// Obtener ubicaciones por entidad
export const obtenerUbicacionesPorEntidad = async (req, res) => {
  try {
    const { entidadId } = req.params;

    const ubicaciones = await UbicacionEntidad.findAll({
      where: { 
        entidadId,
        activa: true 
      },
      include: [
        {
          model: Entidad,
          as: 'entidad',
          include: [
            {
              model: Ciudad,
              attributes: ['nombre', 'departamentoId']
            }
          ]
        }
      ]
    });

    res.status(200).json(ubicaciones);
  } catch (error) {
    console.error('Error al obtener ubicaciones por entidad:', error);
    res.status(500).json({ error: 'Error al obtener las ubicaciones de la entidad' });
  }
};

// Crear nueva ubicación
export const crearUbicacion = async (req, res) => {
  try {
    const { 
      entidadId, 
      latitud, 
      longitud, 
      direccionCompleta,
      activa = true,
      verificada = false
    } = req.body;

    // Verificar que la entidad existe
    const entidad = await Entidad.findByPk(entidadId);
    if (!entidad) {
      return res.status(404).json({ error: 'Entidad no encontrada' });
    }

    const nuevaUbicacion = await UbicacionEntidad.create({
      entidadId,
      latitud,
      longitud,
      direccionCompleta,
      activa,
      verificada
    });

    const ubicacionCompleta = await UbicacionEntidad.findByPk(nuevaUbicacion.id, {
      include: [
        {
          model: Entidad,
          as: 'entidad',
          include: [
            {
              model: Ciudad,
              attributes: ['nombre', 'departamentoId']
            }
          ]
        }
      ]
    });

    res.status(201).json(ubicacionCompleta);
  } catch (error) {
    console.error('Error al crear ubicación:', error);
    res.status(500).json({ error: 'Error al crear la ubicación' });
  }
};

// Actualizar ubicación
export const actualizarUbicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      latitud, 
      longitud, 
      direccionCompleta,
      activa,
      verificada
    } = req.body;

    const ubicacion = await UbicacionEntidad.findByPk(id);
    if (!ubicacion) {
      return res.status(404).json({ error: 'Ubicación no encontrada' });
    }

    await ubicacion.update({
      latitud,
      longitud,
      direccionCompleta,
      activa,
      verificada
    });

    const ubicacionActualizada = await UbicacionEntidad.findByPk(id, {
      include: [
        {
          model: Entidad,
          as: 'entidad',
          include: [
            {
              model: Ciudad,
              attributes: ['nombre', 'departamentoId']
            }
          ]
        }
      ]
    });

    res.status(200).json(ubicacionActualizada);
  } catch (error) {
    console.error('Error al actualizar ubicación:', error);
    res.status(500).json({ error: 'Error al actualizar la ubicación' });
  }
};

// Eliminar ubicación (soft delete)
export const eliminarUbicacion = async (req, res) => {
  try {
    const { id } = req.params;

    const ubicacion = await UbicacionEntidad.findByPk(id);
    if (!ubicacion) {
      return res.status(404).json({ error: 'Ubicación no encontrada' });
    }

    await ubicacion.update({ activa: false });

    res.status(200).json({ message: 'Ubicación desactivada correctamente' });
  } catch (error) {
    console.error('Error al eliminar ubicación:', error);
    res.status(500).json({ error: 'Error al eliminar la ubicación' });
  }
};

// Obtener entidades para el mapa
export const obtenerEntidadesParaMapa = async (req, res) => {
  try {
    const entidades = await Entidad.findAll({
      include: [
        {
          model: UbicacionEntidad,
          as: 'ubicaciones',
          where: { activa: true },
          required: true
        },
        {
          model: Ciudad,
          attributes: ['nombre', 'departamentoId']
        }
      ],
      where: {
        habilitado: true
      }
    });

    // Formatear datos para el mapa
    const entidadesParaMapa = entidades.map(entidad => {
      const ubicacionPrincipal = entidad.ubicaciones[0]; // Tomar la primera ubicación activa
      
      return {
        id: entidad.id,
        name: entidad.razonSocial,
        type: 'entidad',
        company: entidad.razonSocial,
        claseEntidad: entidad.claseEntidad,
        city: entidad.Ciudad ? entidad.Ciudad.nombre : 'Colombia',
        lat: parseFloat(ubicacionPrincipal.latitud),
        lng: parseFloat(ubicacionPrincipal.longitud),
        direccion: ubicacionPrincipal.direccionCompleta || entidad.direccion,
        telefono: entidad.telefono,
        email: entidad.correo,
        website: entidad.paginaweb,
        verificada: ubicacionPrincipal.verificada,
        avatar: entidad.razonSocial.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
      };
    });

    res.status(200).json(entidadesParaMapa);
  } catch (error) {
    console.error('Error al obtener entidades para el mapa:', error);
    res.status(500).json({ error: 'Error al obtener entidades para el mapa' });
  }
};