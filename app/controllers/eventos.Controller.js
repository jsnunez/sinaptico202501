import  Evento  from '../models/evento.js';
import { Op } from 'sequelize';

// Obtener todos los eventos con paginación y filtros
export const obtenerEventos = async (req, res) => {
    try {
        const { page = 1, limit = 10, nombre, estado, fecha } = req.query;
        const offset = (page - 1) * limit;

        const whereCondition = {};

        if (nombre) {
            whereCondition.nombre = { [Op.like]: `%${nombre}%` };
        }

        if (estado) {
            whereCondition.estado = estado;
        }

        if (fecha) {
            whereCondition.fecha = { [Op.gte]: new Date(fecha) };
        }

     

        const { count, rows } = await Evento.findAndCountAll({
            where: whereCondition,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['fecha', 'DESC']]
        });

        res.json({
            eventos: rows,
            total: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page)
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al obtener eventos', 
            error: error.message 
        });
    }
};

// Obtener evento por ID
export const obtenerEventoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        
        const evento = await Evento.findByPk(id);
        
        if (!evento) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        res.json(evento);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al obtener evento', 
            error: error.message 
        });
    }
};
import upload from '../config/multerConfig.js'; // Importa la configuración de multer
import fs from 'fs/promises';
import path from 'path';


// Crear evento
export const crearEvento = async (req, res) => {

    upload.single('fileImagenEvento')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al subir la imagen' });
        }

        try {
            const {
                titulo,
                codigo,
                descripcion,
                modalidad,
                ubicacion,
                fecha,
                horaInicio,
                horaFin,
                cupoMaximo,
                inscripcionRequerida,
                fechaInicioInscripcion,
                fechaCierreInscripcion,
                costo,
                organizador,
                tipoEventoId,
                urlConvocatoria,
                userId,
                tipoConvocatoriaId
            } = req.body;

            // Verificar que la imagen haya llegado
            if (!req.file) {
                return res.status(400).json({ error: 'La imagen del evento es obligatoria.' });
            }

            const urlImagen = req.file.filename;

            const newEvento = await Evento.create({
                titulo,
                codigo,
                descripcion,
                modalidad,
                ubicacion,
                fecha,
                horaInicio,
                horaFin,
                cupoMaximo,
                inscripcionRequerida,
                fechaInicioInscripcion,
                fechaCierreInscripcion,
                costo,
                organizador,
                tipoEventoId,
                urlConvocatoria,
                userId,
                tipoConvocatoriaId,
                urlImagen
            });

            return res.status(201).json({
                message: 'Evento creado con éxito',
                evento: newEvento
            });
        } catch (error) {
            console.error('Error al crear el evento:', error);
            return res.status(500).json({ message: 'Error del servidor', error: error.message });
        }
    });
};

// Actualizar evento
export const actualizarEvento = async (req, res) => {
    try {
        const { id } = req.params;
        
        const [updated] = await Evento.update(req.body, {
            where: { id }
        });

        if (updated === 0) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        const eventoActualizado = await Evento.findByPk(id);
        res.json(eventoActualizado);
    } catch (error) {
        res.status(400).json({ 
            message: 'Error al actualizar evento', 
            error: error.message 
        });
    }
};

// Eliminar evento
export const eliminarEvento = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deleted = await Evento.destroy({
            where: { id }
        });

        if (deleted === 0) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        res.json({ message: 'Evento eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al eliminar evento', 
            error: error.message 
        });
    }
};

// Obtener eventos activos
export const obtenerEventosActivos = async (req, res) => {
    try {
        const eventos = await Evento.findAll({
            where: {
                estado: 'activo',
                fecha: { [Op.gte]: new Date() }
            },
            order: [['fecha', 'ASC']]
        });

        res.json(eventos);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al obtener eventos activos', 
            error: error.message 
        });
    }
};

// Cambiar estado de evento
export const cambiarEstadoEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        const [updated] = await Evento.update(
            { estado },
            { where: { id } }
        );

        if (updated === 0) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        const eventoActualizado = await Evento.findByPk(id);
        res.json(eventoActualizado);
    } catch (error) {
        res.status(400).json({ 
            message: 'Error al cambiar estado del evento', 
            error: error.message 
        });
    }
};

// Obtener cantidad de eventos
export const getCantidadEventos = async (req, res) => {
    try {
        const total = await Evento.count();
        const activos = await Evento.count({ where: { estado: 'activo' } });
        
        res.json({ 
            total, 
            activos, 
            inactivos: total - activos 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al obtener cantidad de eventos', 
            error: error.message 
        });
    }
};
// Cambiar estado habilitado de evento
export const cambiarEstadoHabilitadoEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const { habilitado } = req.body;

        const [updated] = await Evento.update(
            { habilitado },
            { where: { id } }
        );

        if (updated === 0) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        const eventoActualizado = await Evento.findByPk(id);
        res.json(eventoActualizado);
    } catch (error) {
        res.status(400).json({ 
            message: 'Error al cambiar estado habilitado del evento', 
            error: error.message 
        });
    }
};

// Crear evento completo con validaciones
export const crearEventoCompleto = async (req, res) => {
    try {
        const {
            nombre,
            descripcion,
            fecha,
            fechaFin,
            ubicacion,
            capacidadMaxima,
            precio,
            categoria,
            organizador,
            imagen
        } = req.body;

        // Validaciones básicas
        if (!nombre || !fecha || !fechaFin || !ubicacion) {
            return res.status(400).json({
                message: 'Los campos nombre, fecha, fechaFin y ubicacion son obligatorios'
            });
        }

        // Validar que la fecha de inicio sea anterior a la fecha de fin
        if (new Date(fecha) >= new Date(fechaFin)) {
            return res.status(400).json({
                message: 'La fecha de inicio debe ser anterior a la fecha de fin'
            });
        }

        // Validar que la fecha de inicio no sea en el pasado
        if (new Date(fecha) < new Date()) {
            return res.status(400).json({
                message: 'La fecha de inicio no puede ser en el pasado'
            });
        }

        const nuevoEvento = await Evento.create({
            nombre,
            descripcion,
            fecha,
            fechaFin,
            ubicacion,
            capacidadMaxima: capacidadMaxima || 100,
            precio: precio || 0,
            categoria: categoria || 'general',
            organizador,
            imagen,
            estado: 'activo',
            habilitado: true
        });

        res.status(201).json({
            message: 'Evento creado exitosamente',
            evento: nuevoEvento
        });
    } catch (error) {
        res.status(400).json({ 
            message: 'Error al crear evento completo', 
            error: error.message 
        });
    }
};

// Obtener todos los eventos (alias para obtenerEventos)
export const getEventos = obtenerEventos;

// Crear evento (alias para crearEvento)
export const createEvento = crearEvento;

// Eliminar evento (alias para eliminarEvento)
export const deleteEvento = eliminarEvento;

// Actualizar evento (alias para actualizarEvento)
export const updateEvento = actualizarEvento;