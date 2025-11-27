import ConvocatoriaProyectos from '../models/convocatoriaProyectos.js';
import Proyectos from '../models/proyectos.js';
import Convocatoria from '../models/convocatoria.js';
import User from '../models/user.js';
import Entidad from '../models/entidad.js';
import MiembroComite from '../models/miembroComite.js';
import { Op } from 'sequelize';

// Obtener todas las aplicaciones de proyectos a convocatorias
export const getConvocatoriaProyectos = async (req, res) => {
    try {
        const convocatoriaProyectos = await ConvocatoriaProyectos.findAll({
            include: [
                {
                    model: Proyectos,
                    as: 'proyecto',
                    attributes: ['id', 'nombrePPI', 'objetivo', 'objetivosEspecificos', 'necesidadProblema', 'duracionPPI', 'presupuestoPPI', 'fasePPI'],
                    include: [
                        {
                            model: User,
                            as: 'usuarioLider',
                            attributes: ['id', 'name', 'email']
                        },
                        {
                            model: Entidad,
                            as: 'entidad',
                            attributes: ['id', 'razonSocial']
                        }
                    ]
                },
                {
                    model: Convocatoria,
                    as: 'convocatoria',
                    attributes: ['id', 'titulo', 'descripcion', 'fechaApertura', 'fechaCierre']
                }
            ],
            order: [['fechaAplicacion', 'DESC']]
        });

        res.json({
            success: true,
            data: convocatoriaProyectos
        });
    } catch (error) {
        console.error('Error al obtener aplicaciones de convocatorias:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

// Obtener aplicaciones por proyecto
export const getConvocatoriasByProyecto = async (req, res) => {
    try {
        const { proyectoId } = req.params;

        const aplicaciones = await ConvocatoriaProyectos.findAll({
            where: { proyectoId },
            include: [
                {
                    model: Convocatoria,
                    as: 'convocatoria',
                    attributes: ['id', 'titulo', 'descripcion', 'fechaApertura', 'fechaCierre', 'estado']
                }
            ]
        });

        res.json({
            success: true,
            data: aplicaciones
        });
    } catch (error) {
        console.error('Error al obtener convocatorias por proyecto:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

// Obtener proyectos aplicados a una convocatoria
export const getProyectosByConvocatoria = async (req, res) => {
    try {
        const { convocatoriaId } = req.params;

        const aplicaciones = await ConvocatoriaProyectos.findAll({
            where: { convocatoriaId },
            include: [
                {
                    model: Proyectos,
                    as: 'proyecto',
                    attributes: ['id', 'nombrePPI', 'objetivo', 'objetivosEspecificos', 'necesidadProblema']
                }
            ]
        });

        res.json({
            success: true,
            data: aplicaciones
        });
    } catch (error) {
        console.error('Error al obtener proyectos por convocatoria:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

// Crear una nueva aplicación de proyecto a convocatoria
export const verificarPostulacionExistente = async (req, res) => {
    try {
        const { userId, convocatoriaId } = req.params;

        // Buscar proyectos del usuario aplicados a esta convocatoria
        const postulacionExistente = await ConvocatoriaProyectos.findOne({
            include: [
                {
                    model: Proyectos,
                    as: 'proyecto',
                    where: { userId: userId },
                    attributes: ['id', 'nombrePPI', 'userId']
                }
            ],
            where: {
                convocatoriaId: convocatoriaId
            }
        });

        res.json({
            success: true,
            existePostulacion: !!postulacionExistente,
            postulacion: postulacionExistente ? {
                id: postulacionExistente.id,
                estado: postulacionExistente.estado,
                fechaAplicacion: postulacionExistente.fechaAplicacion,
                proyecto: postulacionExistente.proyecto?.nombrePPI
            } : null
        });

    } catch (error) {
        console.error('Error al verificar postulación:', error);
        res.status(500).json({
            success: false,
            message: 'Error al verificar la postulación existente',
            error: error.message
        });
    }
};

export const createConvocatoriaProyecto = async (req, res) => {
    try {
        const {
            proyectoId,
            convocatoriaId,
            documentosPresentados,
            observacionesAplicacion,
            evaluadorAsignado
        } = req.body;

        // Verificar que no exista ya una aplicación del mismo proyecto a la misma convocatoria
        const aplicacionExistente = await ConvocatoriaProyectos.findOne({
            where: {
                proyectoId,
                convocatoriaId
            }
        });

        if (aplicacionExistente) {
            return res.status(400).json({
                success: false,
                message: 'El proyecto ya está aplicado a esta convocatoria'
            });
        }

        const nuevaAplicacion = await ConvocatoriaProyectos.create({
            proyectoId,
            convocatoriaId,
            estado: 'Postulado',
            fechaAplicacion: new Date(),
            documentosPresentados: documentosPresentados || null,
            observacionesAplicacion: observacionesAplicacion || null,
            evaluadorAsignado: evaluadorAsignado || null
        });

        // Incluir datos relacionados en la respuesta
        const aplicacionCompleta = await ConvocatoriaProyectos.findByPk(
            nuevaAplicacion.id,
            {
                include: [
                    {
                        model: Proyectos,
                        as: 'proyecto',
                        attributes: ['id', 'nombrePPI', 'objetivo']
                    },
                    {
                        model: Convocatoria,
                        as: 'convocatoria',
                        attributes: ['id', 'titulo', 'descripcion']
                    }
                ]
            }
        );

        res.status(201).json({
            success: true,
            message: 'Aplicación creada exitosamente',
            data: aplicacionCompleta
        });
    } catch (error) {
        console.error('Error al crear aplicación:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

// Actualizar estado de evaluación
export const updateEstadoEvaluacion = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            estado,
            puntuacionTecnica,
            puntuacionFinanciera,
            puntuacionImpacto,
            evaluadorAsignado,
            observacionesEvaluacion,
            fechaEvaluacion
        } = req.body;

        const aplicacion = await ConvocatoriaProyectos.findByPk(id);

        if (!aplicacion) {
            return res.status(404).json({
                success: false,
                message: 'Aplicación no encontrada'
            });
        }

        // Validar estado
        const estadosValidos = ['Postulado', 'En Evaluacion', 'Preseleccionado', 'Aprobado', 'Rechazado', 'Retirado'];
        if (estado && !estadosValidos.includes(estado)) {
            return res.status(400).json({
                success: false,
                message: 'Estado no válido'
            });
        }

        // Calcular puntuación total si se proporcionan puntuaciones individuales
        let puntuacionTotal = null;
        if (puntuacionTecnica !== undefined || puntuacionFinanciera !== undefined || puntuacionImpacto !== undefined) {
            const tecnica = puntuacionTecnica || aplicacion.puntuacionTecnica || 0;
            const financiera = puntuacionFinanciera || aplicacion.puntuacionFinanciera || 0;
            const impacto = puntuacionImpacto || aplicacion.puntuacionImpacto || 0;
            puntuacionTotal = (tecnica + financiera + impacto) / 3;
        }

        const datosActualizacion = {};
        
        if (estado) datosActualizacion.estado = estado;
        if (puntuacionTecnica !== undefined) datosActualizacion.puntuacionTecnica = puntuacionTecnica;
        if (puntuacionFinanciera !== undefined) datosActualizacion.puntuacionFinanciera = puntuacionFinanciera;
        if (puntuacionImpacto !== undefined) datosActualizacion.puntuacionImpacto = puntuacionImpacto;
        if (puntuacionTotal !== null) datosActualizacion.puntuacionTotal = puntuacionTotal;
        if (evaluadorAsignado) datosActualizacion.evaluadorAsignado = evaluadorAsignado;
        if (observacionesEvaluacion) datosActualizacion.observacionesEvaluacion = observacionesEvaluacion;
        if (fechaEvaluacion) datosActualizacion.fechaEvaluacion = fechaEvaluacion;

        await aplicacion.update(datosActualizacion);

        // Obtener la aplicación actualizada con relaciones
        const aplicacionActualizada = await ConvocatoriaProyectos.findByPk(id, {
            include: [
                {
                    model: Proyectos,
                    as: 'proyecto',
                    attributes: ['id', 'nombrePPI', 'objetivo']
                },
                {
                    model: Convocatoria,
                    as: 'convocatoria',
                    attributes: ['id', 'titulo', 'descripcion']
                }
            ]
        });

        res.json({
            success: true,
            message: 'Evaluación actualizada exitosamente',
            data: aplicacionActualizada
        });
    } catch (error) {
        console.error('Error al actualizar evaluación:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

// Eliminar aplicación
export const deleteConvocatoriaProyecto = async (req, res) => {
    try {
        const { id } = req.params;

        const aplicacion = await ConvocatoriaProyectos.findByPk(id);

        if (!aplicacion) {
            return res.status(404).json({
                success: false,
                message: 'Aplicación no encontrada'
            });
        }

        await aplicacion.destroy();

        res.json({
            success: true,
            message: 'Aplicación eliminada exitosamente'
        });
    } catch (error) {
        console.error('Error al eliminar aplicación:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

// Obtener estadísticas de aplicaciones por convocatoria
export const getEstadisticasConvocatoria = async (req, res) => {
    try {
        const { convocatoriaId } = req.params;

        const estadisticas = await ConvocatoriaProyectos.findAll({
            where: { convocatoriaId },
            attributes: [
                'estado',
                [ConvocatoriaProyectos.sequelize.fn('COUNT', ConvocatoriaProyectos.sequelize.col('id')), 'cantidad']
            ],
            group: ['estado']
        });

        const puntuacionPromedio = await ConvocatoriaProyectos.findOne({
            where: { 
                convocatoriaId,
                puntuacionTotal: { [Op.not]: null }
            },
            attributes: [
                [ConvocatoriaProyectos.sequelize.fn('AVG', ConvocatoriaProyectos.sequelize.col('puntuacionTotal')), 'promedio'],
                [ConvocatoriaProyectos.sequelize.fn('MAX', ConvocatoriaProyectos.sequelize.col('puntuacionTotal')), 'maximo'],
                [ConvocatoriaProyectos.sequelize.fn('MIN', ConvocatoriaProyectos.sequelize.col('puntuacionTotal')), 'minimo']
            ]
        });

        res.json({
            success: true,
            data: {
                estadisticasPorEstado: estadisticas,
                puntuaciones: puntuacionPromedio
            }
        });
    } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

// Asignar múltiples evaluadores a múltiples proyectos
export const asignarEvaluadoresMultiples = async (req, res) => {
    try {
        const { asignaciones } = req.body;

        // Validar que asignaciones sea un array no vacío
        if (!Array.isArray(asignaciones) || asignaciones.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Se requiere un array de asignaciones no vacío'
            });
        }

        // Validar estructura de cada asignación
        for (const asignacion of asignaciones) {
            if (!asignacion.proyectoId || !asignacion.evaluadorId) {
                return res.status(400).json({
                    success: false,
                    message: 'Cada asignación debe incluir proyectoId y evaluadorId'
                });
            }
        }

        const proyectosIds = [...new Set(asignaciones.map(a => a.proyectoId))];
        const evaluadoresIds = [...new Set(asignaciones.map(a => a.evaluadorId))];

        // Verificar que los proyectos existan
        const proyectosExistentes = await ConvocatoriaProyectos.findAll({
            where: {
                id: { [Op.in]: proyectosIds }
            },
            include: [
                {
                    model: Proyectos,
                    as: 'proyecto',
                    attributes: ['id', 'nombrePPI']
                }
            ]
        });

        if (proyectosExistentes.length !== proyectosIds.length) {
            return res.status(404).json({
                success: false,
                message: 'Uno o más proyectos no fueron encontrados'
            });
        }

        // Verificar que los evaluadores existan
        const evaluadoresExistentes = await MiembroComite.findAll({
            where: {
                id: { [Op.in]: evaluadoresIds },
                activo: true,
                estado: 'activo'
            }
        });

        if (evaluadoresExistentes.length !== evaluadoresIds.length) {
            return res.status(404).json({
                success: false,
                message: 'Uno o más evaluadores no fueron encontrados o no están activos'
            });
        }

        const resultados = [];
        const errores = [];

        // Procesar cada asignación
        for (const asignacion of asignaciones) {
            try {
                const { proyectoId, evaluadorId } = asignacion;

                // Buscar el proyecto específico
                const proyecto = proyectosExistentes.find(p => p.id === proyectoId);
                const evaluador = evaluadoresExistentes.find(e => e.id === evaluadorId);

                if (!proyecto || !evaluador) {
                    errores.push({
                        proyectoId,
                        evaluadorId,
                        error: 'Proyecto o evaluador no encontrado'
                    });
                    continue;
                }

                // Obtener evaluadores asignados actual (asegurar que sea un array)
                let evaluadoresAsignados = [];
                try {
                    if (proyecto.evaluadoresAsignados) {
                        evaluadoresAsignados = Array.isArray(proyecto.evaluadoresAsignados) 
                            ? proyecto.evaluadoresAsignados 
                            : JSON.parse(proyecto.evaluadoresAsignados);
                    }
                } catch (error) {
                    console.log('Error parsing evaluadoresAsignados, inicializando array vacío:', error.message);
                    evaluadoresAsignados = [];
                }

                // Verificar si el evaluador ya está asignado
                if (evaluadoresAsignados.includes(evaluador.email)) {
                    console.log(`Evaluador ${evaluador.email} ya está asignado al proyecto ${proyecto.id}`);
                    continue; // Saltar esta asignación
                }

                // Agregar evaluador al array
                evaluadoresAsignados.push(evaluador.email);

                // Preparar datos para actualizar
                const updateData = {
                    evaluadoresAsignados: evaluadoresAsignados,
                    fechaAsignacionEvaluador: new Date()
                };

                // Si no hay evaluador principal, asignar como principal
                if (!proyecto.evaluadorAsignado) {
                    updateData.evaluadorAsignado = evaluador.email;
                    updateData.estado = 'En Evaluacion';
                }

                // Actualizar proyecto usando Sequelize ORM en lugar de SQL directo
                await proyecto.update(updateData);
                
                console.log(`✅ Evaluador ${evaluador.email} asignado al proyecto ${proyecto.id}`);
                console.log(`📋 Evaluadores actuales:`, evaluadoresAsignados);

                // Incrementar contador de proyectos evaluados del miembro
                await evaluador.increment('proyectosEvaluados');

                resultados.push({
                    proyectoId: proyecto.id,
                    proyectoNombre: proyecto.proyecto?.nombrePPI,
                    evaluadorId: evaluador.id,
                    evaluadorNombre: evaluador.nombre,
                    evaluadorEmail: evaluador.email,
                    status: 'Asignado exitosamente'
                });

            } catch (error) {
                console.error(`Error procesando asignación ${asignacion.proyectoId} - ${asignacion.evaluadorId}:`, error);
                errores.push({
                    proyectoId: asignacion.proyectoId,
                    evaluadorId: asignacion.evaluadorId,
                    error: error.message
                });
            }
        }

        // Enviar respuesta con resultados
        const response = {
            success: true,
            message: `Se procesaron ${resultados.length} asignaciones correctamente`,
            data: {
                asignacionesExitosas: resultados.length,
                totalProcesadas: asignaciones.length,
                asignaciones: resultados
            }
        };

        if (errores.length > 0) {
            response.errores = errores;
            response.message += ` con ${errores.length} errores`;
        }

        res.json(response);

    } catch (error) {
        console.error('Error en asignación múltiple:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Guardar evaluación individual de un evaluador
export const guardarEvaluacionIndividual = async (req, res) => {
    try {
        const { id } = req.params; // ID de la aplicación ConvocatoriaProyectos
        const {
            evaluadorEmail,
            evaluadorNombre,
            puntuacionTecnica,
            puntuacionFinanciera,
            puntuacionImpacto,
            puntuacionTotal,
            observaciones,
            completada,
            fechaEvaluacion,
            fechaCompletada
        } = req.body;

        // Validaciones
        if (!evaluadorEmail) {
            return res.status(400).json({
                success: false,
                message: 'Email del evaluador es requerido'
            });
        }

        // Buscar la aplicación
        const aplicacion = await ConvocatoriaProyectos.findByPk(id);
        if (!aplicacion) {
            return res.status(404).json({
                success: false,
                message: 'Aplicación no encontrada'
            });
        }

        // Verificar que el evaluador esté asignado a este proyecto
        let evaluadoresAsignados = [];
        try {
            if (aplicacion.evaluadoresAsignados) {
                evaluadoresAsignados = Array.isArray(aplicacion.evaluadoresAsignados) 
                    ? aplicacion.evaluadoresAsignados 
                    : JSON.parse(aplicacion.evaluadoresAsignados);
            }
        } catch (error) {
            console.log('Error parsing evaluadoresAsignados:', error.message);
            evaluadoresAsignados = [];
        }

        const evaluadorAsignado = aplicacion.evaluadorAsignado === evaluadorEmail ||
            evaluadoresAsignados.includes(evaluadorEmail);

        if (!evaluadorAsignado) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permisos para evaluar este proyecto'
            });
        }

        // Obtener evaluaciones individuales existentes (asegurar que sea un array)
        let evaluacionesIndividuales = [];
        try {
            if (aplicacion.evaluacionesIndividuales) {
                evaluacionesIndividuales = Array.isArray(aplicacion.evaluacionesIndividuales) 
                    ? aplicacion.evaluacionesIndividuales 
                    : JSON.parse(aplicacion.evaluacionesIndividuales);
            }
        } catch (error) {
            console.log('Error parsing evaluacionesIndividuales, inicializando array vacío:', error.message);
            evaluacionesIndividuales = [];
        }
        
        // Buscar si ya existe una evaluación de este evaluador
        const indiceEvaluacionExistente = evaluacionesIndividuales.findIndex(
            e => e.evaluadorEmail === evaluadorEmail
        );

        // Preparar los datos de la nueva evaluación
        const nuevaEvaluacion = {
            evaluadorEmail,
            evaluadorNombre,
            puntuacionTecnica: parseFloat(puntuacionTecnica) || 0,
            puntuacionFinanciera: parseFloat(puntuacionFinanciera) || 0,
            puntuacionImpacto: parseFloat(puntuacionImpacto) || 0,
            puntuacionTotal: parseFloat(puntuacionTotal) || 0,
            observaciones: observaciones || '',
            completada: completada || false,
            fechaEvaluacion: fechaEvaluacion || new Date().toISOString(),
            fechaCompletada: completada ? (fechaCompletada || new Date().toISOString()) : null
        };

        // Actualizar o agregar la evaluación
        if (indiceEvaluacionExistente !== -1) {
            // Actualizar evaluación existente
            evaluacionesIndividuales[indiceEvaluacionExistente] = {
                ...evaluacionesIndividuales[indiceEvaluacionExistente],
                ...nuevaEvaluacion
            };
        } else {
            // Agregar nueva evaluación
            evaluacionesIndividuales.push(nuevaEvaluacion);
        }

        // Calcular puntuación promedio si hay evaluaciones completadas
        const evaluacionesCompletadas = evaluacionesIndividuales.filter(e => e.completada);
        let puntuacionPromedioFinal = null;

        if (evaluacionesCompletadas.length > 0) {
            const sumaTotal = evaluacionesCompletadas.reduce((sum, e) => sum + e.puntuacionTotal, 0);
            puntuacionPromedioFinal = sumaTotal / evaluacionesCompletadas.length;
        }

        // Actualizar la aplicación
        const datosActualizacion = {
            evaluacionesIndividuales: evaluacionesIndividuales,
            fechaEvaluacion: new Date()
        };

        // Si hay evaluaciones completadas, actualizar la puntuación total
        if (puntuacionPromedioFinal !== null) {
            datosActualizacion.puntuacionTotal = puntuacionPromedioFinal;
            
            // Calcular promedios por criterio
            const promTecnica = evaluacionesCompletadas.reduce((sum, e) => sum + e.puntuacionTecnica, 0) / evaluacionesCompletadas.length;
            const promFinanciera = evaluacionesCompletadas.reduce((sum, e) => sum + e.puntuacionFinanciera, 0) / evaluacionesCompletadas.length;
            const promImpacto = evaluacionesCompletadas.reduce((sum, e) => sum + e.puntuacionImpacto, 0) / evaluacionesCompletadas.length;
            
            datosActualizacion.puntuacionTecnica = promTecnica;
            datosActualizacion.puntuacionFinanciera = promFinanciera;
            datosActualizacion.puntuacionImpacto = promImpacto;
        }

        // Si todas las evaluaciones están completadas, actualizar estado
        const totalEvaluadoresAsignados = aplicacion.evaluadoresAsignados?.length || 1;
        if (evaluacionesCompletadas.length >= totalEvaluadoresAsignados) {
            datosActualizacion.estado = 'Preseleccionado';
        } else if (evaluacionesCompletadas.length > 0) {
            datosActualizacion.estado = 'En Evaluacion';
        }

        await aplicacion.update(datosActualizacion);

        // Incrementar contador del evaluador si la evaluación se completó
        if (completada && indiceEvaluacionExistente === -1) {
            const miembro = await MiembroComite.findOne({ where: { email: evaluadorEmail } });
            if (miembro) {
                await miembro.increment('proyectosEvaluados');
            }
        }

        res.json({
            success: true,
            message: completada ? 'Evaluación completada exitosamente' : 'Borrador guardado exitosamente',
            data: {
                evaluacion: nuevaEvaluacion,
                puntuacionPromedio: puntuacionPromedioFinal,
                totalEvaluacionesCompletadas: evaluacionesCompletadas.length,
                estadoProyecto: datosActualizacion.estado || aplicacion.estado
            }
        });

    } catch (error) {
        console.error('Error guardando evaluación individual:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

export const finalizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { observacionesEvaluacion, estado, fechaEvaluacion, puntuacionTotal } = req.body;
console.log('Finalizar llamada con datos:', { id, observacionesEvaluacion, estado, fechaEvaluacion, puntuacionTotal });
        const aplicacion = await ConvocatoriaProyectos.findByPk(id);

        if (!aplicacion) {
            return res.status(404).json({
                success: false,
                message: 'Aplicación no encontrada'
            });
        }

        const datosActualizacion = {};
        if (observacionesEvaluacion !== undefined) datosActualizacion.observacionesEvaluacion = observacionesEvaluacion;
        if (estado !== undefined) datosActualizacion.estado = estado;
        if (fechaEvaluacion !== undefined) datosActualizacion.fechaEvaluacion = fechaEvaluacion;
        if (puntuacionTotal !== undefined) datosActualizacion.puntuacionTotal = puntuacionTotal;

        await aplicacion.update(datosActualizacion);

        res.json({
            success: true,
            message: 'Aplicación finalizada y actualizada exitosamente',
            data: datosActualizacion
        });
    } catch (error) {
        console.error('Error al finalizar aplicación:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
}