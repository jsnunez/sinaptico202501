import MiembroComite from '../models/miembroComite.js';
import User from '../models/user.js';
import Entidad from '../models/entidad.js';
import { Op } from 'sequelize';

export const methods = {
    // Obtener usuarios administradores de entidades para seleccionar como miembros del comité
    async obtenerUsuariosAdministradores(req, res) {
        try {
            const usuariosAdmin = await User.findAll({
                include: [
                    {
                        model: Entidad,
                        as: 'entidadAdministrada',
                        required: true, // Solo usuarios que tienen una entidad administrada
                        attributes: ['id', 'razonSocial', 'claseEntidad', 'ciudadId']
                    }
                ],
                attributes: ['id', 'name','email', 'telefono'],
                order: [['name', 'ASC']]
                
            });

            // Verificar cuáles ya son miembros del comité
            const miembrosActuales = await MiembroComite.findAll({
                where: { activo: true },
                attributes: ['userId']
            });

            const idsmiembrosActuales = miembrosActuales.map(m => m.userId).filter(id => id);

            const usuariosConEstado = usuariosAdmin.map(usuario => ({
                ...usuario.toJSON(),
                esMiembro: idsmiembrosActuales.includes(usuario.id),
                nombreCompleto: usuario.name,
                entidad: usuario.entidadAdministrada
            }));

            res.status(200).json(usuariosConEstado);
        } catch (error) {
            console.error('Error al obtener usuarios administradores:', error);
            res.status(500).json({ 
                error: 'Error interno del servidor',
                details: error.message 
            });
        }
    },

    // Agregar usuario como miembro del comité
    async agregarMiembroDesdeUsuario(req, res) {
        try {
            const { userId, cargo = 'Miembro', especialidades = [] } = req.body;
            console.log('Datos recibidos:', { userId, cargo, especialidades, tipoEspecialidades: typeof especialidades });

            // Asegurar que especialidades es un array
            const especialidadesArray = Array.isArray(especialidades) ? especialidades : [];
            console.log('Especialidades procesadas:', especialidadesArray);

            // Verificar que el usuario existe y es administrador de una entidad
            const usuario = await User.findOne({
                where: { id: userId },
                include: [{
                    model: Entidad,
                    as: 'entidadAdministrada',
                    required: true
                }]
            });

            if (!usuario) {
                return res.status(404).json({ error: 'Usuario no encontrado o no es administrador de una entidad' });
            }

            // Verificar si ya es miembro activo del comité
            const miembroActivoExistente = await MiembroComite.findOne({
                where: { userId, activo: true }
            });

            if (miembroActivoExistente) {
                return res.status(400).json({ error: 'El usuario ya es miembro activo del comité' });
            }

            // Verificar si existe un registro inactivo para reactivar
            const miembroInactivo = await MiembroComite.findOne({
                where: { userId, activo: false }
            });

            let miembro;

            if (miembroInactivo) {
                // Reactivar el miembro existente con nuevos datos
                await miembroInactivo.update({
                    cargo,
                    especialidades: especialidadesArray,
                    estado: 'activo',
                    activo: true,
                    fechaSalida: null,
                    fechaIngreso: new Date() // Actualizar fecha de reingreso
                });
                miembro = miembroInactivo;
                res.status(200).json({ 
                    message: 'Miembro reactivado exitosamente',
                    miembro,
                    reactivated: true 
                });
            } else {
                // Crear nuevo miembro del comité
                miembro = await MiembroComite.create({
                    userId,
                    nombre: usuario.name,
                    cargo,
                    institucion: usuario.entidadAdministrada.razonSocial,
                    email: usuario.email,
                    telefono: usuario.telefono,
                    especialidades: especialidadesArray,
                    estado: 'activo',
                    fechaIngreso: new Date(),
                    activo: true
                });
                res.status(201).json({ 
                    message: 'Miembro creado exitosamente',
                    miembro,
                    reactivated: false 
                });
            }
        } catch (error) {
            console.error('Error al agregar miembro:', error);
            res.status(500).json({ 
                error: 'Error interno del servidor',
                details: error.message 
            });
        }
    },

    // Remover miembro del comité (marcar como inactivo)
    async removerMiembro(req, res) {
        try {
            const { id } = req.params;
            
            const miembro = await MiembroComite.findByPk(id);
            
            if (!miembro) {
                return res.status(404).json({ error: 'Miembro no encontrado' });
            }

            await miembro.update({ 
                activo: false,
                estado: 'inactivo',
                fechaSalida: new Date()
            });

            res.status(200).json({ message: 'Miembro removido exitosamente', miembro });
        } catch (error) {
            console.error('Error al remover miembro:', error);
            res.status(500).json({ 
                error: 'Error interno del servidor',
                details: error.message 
            });
        }
    },

    // Obtener todos los miembros del comité
    async obtenerMiembros(req, res) {
        try {
            const { estado, especialidad, activo = true } = req.query;
            
            const filtros = { activo };
            
            if (estado) {
                filtros.estado = estado;
            }
            
            if (especialidad) {
                filtros.especialidades = {
                    [Op.contains]: [especialidad]
                };
            }

            const miembros = await MiembroComite.findAll({
                where: filtros,
                order: [['fechaIngreso', 'DESC']]
            });

            console.log('Miembros encontrados:', miembros.length);
            miembros.forEach(m => {
                console.log(`Miembro ${m.nombre}: especialidades =`, m.especialidades, typeof m.especialidades);
            });

            res.status(200).json(miembros);
        } catch (error) {
            console.error('Error al obtener miembros:', error);
            res.status(500).json({ 
                error: 'Error interno del servidor',
                details: error.message 
            });
        }
    },

    // Obtener un miembro específico por ID
    async obtenerMiembroPorId(req, res) {
        try {
            const { id } = req.params;
            
            const miembro = await MiembroComite.findOne({
                where: {
                    [Op.or]: [
                        { id },
                        { userId: id }
                    ]
                }
            });
            
            if (!miembro) {
                return res.status(404).json({ error: 'Miembro no encontrado' });
            }

            res.status(200).json(miembro);
        } catch (error) {
            console.error('Error al obtener miembro:', error);
            res.status(500).json({ 
                error: 'Error interno del servidor',
                details: error.message 
            });
        }
    },

    // Crear un nuevo miembro del comité
    async crearMiembro(req, res) {
        try {
            const {
                nombre,
                cargo,
                institucion,
                email,
                telefono,
                especialidades,
                experiencia,
                formacion,
                fechaIngreso
            } = req.body;

            // Validar email único
            const emailExistente = await MiembroComite.findOne({ where: { email } });
            if (emailExistente) {
                return res.status(400).json({ error: 'Ya existe un miembro con ese email' });
            }

            const nuevoMiembro = await MiembroComite.create({
                nombre,
                cargo,
                institucion,
                email,
                telefono,
                especialidades: especialidades || [],
                experiencia,
                formacion,
                fechaIngreso: fechaIngreso || new Date(),
                estado: 'activo',
                proyectosEvaluados: 0
            });

            res.status(201).json({
                message: 'Miembro creado exitosamente',
                miembro: nuevoMiembro
            });
        } catch (error) {
            console.error('Error al crear miembro:', error);
            
            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({
                    error: 'Datos de validación incorrectos',
                    details: error.errors.map(e => e.message)
                });
            }
            
            res.status(500).json({ 
                error: 'Error interno del servidor',
                details: error.message 
            });
        }
    },

    // Actualizar un miembro del comité
    async actualizarMiembro(req, res) {
        try {
            const { id } = req.params;
            const datosActualizacion = req.body;

            const miembro = await MiembroComite.findByPk(id);
            if (!miembro) {
                return res.status(404).json({ error: 'Miembro no encontrado' });
            }

            // Si se está actualizando el email, verificar que no exista
            if (datosActualizacion.email && datosActualizacion.email !== miembro.email) {
                const emailExistente = await MiembroComite.findOne({ 
                    where: { 
                        email: datosActualizacion.email,
                        id: { [Op.ne]: id }
                    } 
                });
                if (emailExistente) {
                    return res.status(400).json({ error: 'Ya existe un miembro con ese email' });
                }
            }

            await miembro.update(datosActualizacion);

            res.status(200).json({
                message: 'Miembro actualizado exitosamente',
                miembro
            });
        } catch (error) {
            console.error('Error al actualizar miembro:', error);
            
            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({
                    error: 'Datos de validación incorrectos',
                    details: error.errors.map(e => e.message)
                });
            }
            
            res.status(500).json({ 
                error: 'Error interno del servidor',
                details: error.message 
            });
        }
    },

    // Eliminar (desactivar) un miembro del comité
    async eliminarMiembro(req, res) {
        try {
            const { id } = req.params;
            
            const miembro = await MiembroComite.findByPk(id);
            if (!miembro) {
                return res.status(404).json({ error: 'Miembro no encontrado' });
            }

            await miembro.update({ activo: false, estado: 'inactivo' });

            res.status(200).json({
                message: 'Miembro desactivado exitosamente'
            });
        } catch (error) {
            console.error('Error al eliminar miembro:', error);
            res.status(500).json({ 
                error: 'Error interno del servidor',
                details: error.message 
            });
        }
    },

    // Actualizar proyectos evaluados de un miembro
    async actualizarProyectosEvaluados(req, res) {
        try {
            const { id } = req.params;
            const { incremento = 1 } = req.body;

            const miembro = await MiembroComite.findByPk(id);
            if (!miembro) {
                return res.status(404).json({ error: 'Miembro no encontrado' });
            }

            await miembro.update({
                proyectosEvaluados: miembro.proyectosEvaluados + incremento
            });

            res.status(200).json({
                message: 'Proyectos evaluados actualizados',
                proyectosEvaluados: miembro.proyectosEvaluados
            });
        } catch (error) {
            console.error('Error al actualizar proyectos evaluados:', error);
            res.status(500).json({ 
                error: 'Error interno del servidor',
                details: error.message 
            });
        }
    },

    // Obtener estadísticas de los miembros
    async obtenerEstadisticas(req, res) {
        try {
            const totalMiembros = await MiembroComite.count({ where: { activo: true } });
            const miembrosActivos = await MiembroComite.count({ 
                where: { activo: true, estado: 'activo' } 
            });
            
            // Obtener todas las especialidades únicas
            const miembros = await MiembroComite.findAll({
                where: { activo: true },
                attributes: ['especialidades']
            });
            
            const especialidadesUnicas = new Set();
            miembros.forEach(miembro => {
                if (miembro.especialidades) {
                    miembro.especialidades.forEach(esp => especialidadesUnicas.add(esp));
                }
            });

            // Total de proyectos evaluados
            const { rows } = await MiembroComite.findAndCountAll({
                where: { activo: true },
                attributes: ['proyectosEvaluados']
            });
            const totalProyectosEvaluados = rows.reduce((sum, miembro) => sum + miembro.proyectosEvaluados, 0);

            res.status(200).json({
                totalMiembros,
                miembrosActivos,
                especialidades: especialidadesUnicas.size,
                proyectosEvaluados: totalProyectosEvaluados
            });
        } catch (error) {
            console.error('Error al obtener estadísticas:', error);
            res.status(500).json({ 
                error: 'Error interno del servidor',
                details: error.message 
            });
        }
    },

    // Buscar miembros por texto
    async buscarMiembros(req, res) {
        try {
            const { q } = req.query;
            
            if (!q || q.trim().length < 2) {
                return res.status(400).json({ error: 'La consulta debe tener al menos 2 caracteres' });
            }

            const miembros = await MiembroComite.findAll({
                where: {
                    activo: true,
                    [Op.or]: [
                        { nombre: { [Op.iLike]: `%${q}%` } },
                        { cargo: { [Op.iLike]: `%${q}%` } },
                        { institucion: { [Op.iLike]: `%${q}%` } }
                    ]
                },
                order: [['nombre', 'ASC']]
            });

            res.status(200).json(miembros);
        } catch (error) {
            console.error('Error al buscar miembros:', error);
            res.status(500).json({ 
                error: 'Error interno del servidor',
                details: error.message 
            });
        }
    }
};