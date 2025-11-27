import AsignacionEvaluador from '../models/asignacionEvaluador.js';
import MiembroComite from '../models/miembroComite.js';
import Proyectos from '../models/proyectos.js';
import Convocatoria from '../models/convocatoria.js';
import Entidad from '../models/entidad.js';
import User from '../models/user.js';
import { Op } from 'sequelize';

// Crear nueva asignación de evaluador
export const crearAsignacionEvaluador = async (req, res) => {
    try {
        const {
            convocatoriaId,
            proyectoId,
            evaluadorId
        } = req.body;

        // Validaciones
        if (!convocatoriaId || !proyectoId || !evaluadorId) {
            return res.status(400).json({
                success: false,
                message: 'convocatoriaId, proyectoId y evaluadorId son requeridos'
            });
        }

        // Verificar que no existe ya una asignación
        const asignacionExistente = await AsignacionEvaluador.findOne({
            where: {
                convocatoriaId,
                proyectoId,
                evaluadorId
            }
        });

        if (asignacionExistente) {
            return res.status(409).json({
                success: false,
                message: 'El evaluador ya está asignado a este proyecto en esta convocatoria'
            });
        }

        // Verificar que existan las entidades relacionadas
        const [convocatoria, proyecto, evaluador] = await Promise.all([
            Convocatoria.findByPk(convocatoriaId),
            Proyectos.findByPk(proyectoId),
            MiembroComite.findByPk(evaluadorId)
        ]);

        if (!convocatoria) {
            return res.status(404).json({
                success: false,
                message: 'Convocatoria no encontrada'
            });
        }

        if (!proyecto) {
            return res.status(404).json({
                success: false,
                message: 'Proyecto no encontrado'
            });
        }

        if (!evaluador || !evaluador.activo) {
            return res.status(404).json({
                success: false,
                message: 'Evaluador no encontrado o inactivo'
            });
        }

        // Crear la asignación
        const nuevaAsignacion = await AsignacionEvaluador.create({
            convocatoriaId,
            proyectoId,
            evaluadorId,
            estado: 'Asignado',
            fechaAsignacion: new Date()
        });

        // Incrementar contador del evaluador
        await evaluador.increment('proyectosEvaluados');

        // Obtener la asignación completa con relaciones
        const asignacionCompleta = await AsignacionEvaluador.findByPk(nuevaAsignacion.id, {
            include: [
                {
                    model: Convocatoria,
                    as: 'convocatoria',
                    attributes: ['id', 'titulo', 'descripcion']
                },
                {
                    model: Proyectos,
                    as: 'proyecto',
                    attributes: ['id', 'nombrePPI', 'objetivo'],
                    include: [
                        {
                            model: Entidad,
                            as: 'entidad',
                            attributes: ['id', 'razonSocial']
                        }
                    ]
                },
                {
                    model: MiembroComite,
                    as: 'evaluador',
                    attributes: ['id', 'nombre', 'email', 'especialidades']
                }
            ]
        });

        res.status(201).json({
            success: true,
            message: 'Asignación creada exitosamente',
            data: asignacionCompleta
        });

    } catch (error) {
        console.error('Error creando asignación de evaluador:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

// Crear múltiples asignaciones en lote
export const crearAsignacionesMultiples = async (req, res) => {
    try {
        const { asignaciones } = req.body;
console.log(asignaciones);
        if (!Array.isArray(asignaciones) || asignaciones.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Se requiere un array de asignaciones no vacío'
            });
        }

        const resultados = [];
        const errores = [];

        for (const asignacion of asignaciones) {
            try {
                const { convocatoriaId, proyectoId, evaluadorId } = asignacion;
console.log("convocatoriaId"+convocatoriaId);
console.log("proyectoId"+proyectoId);
console.log("evaluadorId"+evaluadorId);
                // Verificar duplicados
                const existente = await AsignacionEvaluador.findOne({
                    where: { convocatoriaId, proyectoId, evaluadorId }
                });

                if (existente) {
                    errores.push({
                        asignacion,
                        error: 'Asignación ya existe'
                    });
                    continue;
                }

                // Crear asignación
                const nuevaAsignacion = await AsignacionEvaluador.create({
                    convocatoriaId,
                    proyectoId,
                    evaluadorId,
                    estado: 'Asignado'
                });

                resultados.push({
                    id: nuevaAsignacion.id,
                    ...asignacion,
                    estado: 'Asignado'
                });

            } catch (error) {
                errores.push({
                    asignacion,
                    error: error.message
                });
            }
        }

        res.json({
            success: true,
            message: `Procesadas ${asignaciones.length} asignaciones`,
            data: {
                exitosas: resultados.length,
                errores: errores.length,
                resultados,
                errores
            }
        });

    } catch (error) {
        console.error('Error en asignaciones múltiples:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

// Obtener asignaciones con filtros
export const obtenerAsignaciones = async (req, res) => {
    try {
        
        const {
            convocatoriaId,
            proyectoId,
            evaluadorId,
            estado,
            recomendacion,
            page = 1,
            limit = 50
        } = req.query;

        const where = {};

        if (convocatoriaId) where.convocatoriaId = convocatoriaId;
        if (proyectoId) where.proyectoId = proyectoId;
        if (evaluadorId) where.evaluadorId = evaluadorId;
        if (estado) where.estado = estado;
        if (recomendacion) where.recomendacion = recomendacion;

        const offset = (page - 1) * limit;

        const { count, rows } = await AsignacionEvaluador.findAndCountAll({
            where,
            include: [
                {
                    model: Convocatoria,
                    as: 'convocatoria',
                    attributes: ['id', 'titulo', 'fechaApertura', 'fechaApertura']
                },
                {
                    model: Proyectos,
                    as: 'proyecto',
                    attributes: ['id', 'nombrePPI', 'objetivo', 'presupuestoPPI'],
                    include: [
                        {
                            model: Entidad,
                            as: 'entidad',
                            attributes: ['id', 'razonSocial']
                        },
                        {
                            model: User,
                            as: 'usuarioLider',
                            attributes: ['id', 'name', 'email']
                        }
                    ]
                },
                {
                    model: MiembroComite,
                    as: 'evaluador',
                    attributes: ['id', 'nombre', 'email', 'especialidades', 'institucion']
                }
            ],
            limit: parseInt(limit),
            offset: offset,
            order: [['fechaAsignacion', 'DESC']]
        });

        res.json({
            success: true,
            data: rows,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: Math.ceil(count / limit)
            }
        });

    } catch (error) {
        console.error('Error obteniendo asignaciones:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

// Actualizar evaluación (5 criterios)
export const actualizarEvaluacion = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            criterio1_viabilidad_tecnica,
            criterio2_impacto_social,
            criterio3_sostenibilidad_financiera,
            criterio4_innovacion,
            criterio5_capacidad_ejecucion,
            observaciones_criterio1,
            observaciones_criterio2,
            observaciones_criterio3,
            observaciones_criterio4,
            observaciones_criterio5,
            observacionesGenerales,
            recomendacion,
            prioridad,
            tiempoEvaluacion,
            archivosAdjuntos,
            completarEvaluacion = false
        } = req.body;

        const asignacion = await AsignacionEvaluador.findByPk(id);

        if (!asignacion) {
            return res.status(404).json({
                success: false,
                message: 'Asignación no encontrada'
            });
        }

        // Procesar archivosAdjuntos si vienen como FileList o array
        let archivosAdjuntosProcesados = archivosAdjuntos;
        if (archivosAdjuntos && typeof archivosAdjuntos === 'object' && archivosAdjuntos.length !== undefined) {
            archivosAdjuntosProcesados = Array.from(archivosAdjuntos).map(f => f.name || f);
        }

        // Enviar todos los criterios aunque sean null/undefined
        const datosActualizacion = {
            criterio1_viabilidad_tecnica,
            criterio2_impacto_social,
            criterio3_sostenibilidad_financiera,
            criterio4_innovacion,
            criterio5_capacidad_ejecucion,
            observaciones_criterio1,
            observaciones_criterio2,
            observaciones_criterio3,
            observaciones_criterio4,
            observaciones_criterio5,
            observacionesGenerales,
            recomendacion,
            prioridad,
            tiempoEvaluacion,
            archivosAdjuntos: archivosAdjuntosProcesados
            , fechaInicioEvaluacion: new Date()
        };

        // Actualizar estado si se completa la evaluación
        if (completarEvaluacion) {
            const criteriosCompletos = [
                datosActualizacion.criterio1_viabilidad_tecnica,
                datosActualizacion.criterio2_impacto_social,
                datosActualizacion.criterio3_sostenibilidad_financiera,
                datosActualizacion.criterio4_innovacion,
                datosActualizacion.criterio5_capacidad_ejecucion
            ].every(criterio => criterio !== undefined);

            // if (!criteriosCompletos) {
            //     return res.status(400).json({
            //         success: false,
            //         message: 'Todos los 5 criterios deben ser evaluados para completar la evaluación'
            //     });
            // }

            if (!datosActualizacion.recomendacion) {
                return res.status(400).json({
                    success: false,
                    message: 'La recomendación final es requerida para completar la evaluación'
                });
            }

            datosActualizacion.estado = 'Completada';
            datosActualizacion.fechaCompletada = new Date();
        } else if (asignacion.estado === 'Asignado') {
            datosActualizacion.estado = 'En_Progreso';
            datosActualizacion.fechaInicioEvaluacion = new Date();
        }

        await asignacion.update(datosActualizacion);

        const asignacionActualizada = await AsignacionEvaluador.findByPk(id, {
            include: [
                {
                    model: Convocatoria,
                    as: 'convocatoria',
                    attributes: ['id', 'titulo']
                },
                {
                    model: Proyectos,
                    as: 'proyecto',
                    attributes: ['id', 'nombrePPI']
                },
                {
                    model: MiembroComite,
                    as: 'evaluador',
                    attributes: ['id', 'nombre', 'email']
                }
            ]
        });

        res.json({
            success: true,
            message: completarEvaluacion ? 'Evaluación completada exitosamente' : 'Evaluación actualizada exitosamente',
            data: asignacionActualizada
        });

    } catch (error) {
        console.error('Error actualizando evaluación:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

// Obtener asignaciones de un evaluador específico
export const obtenerAsignacionesEvaluador = async (req, res) => {
  try {
const userId = req.params.id;

const miembro = await MiembroComite.findOne({ where: { userId } });

const evaluadorId = miembro?.id;
console.log("Evaluador ID encontrado: ", evaluadorId);

const asignaciones = await AsignacionEvaluador.findAll({
  where: { evaluadorId },

      include: [
        {
          model: User,
          as: "Evaluador",
          attributes: ["id", "name", "email"]
        },
        {
          model: Convocatoria,
          attributes: ["id", "titulo", "fechaApertura", "fechaCierre"]
        },
        {
          model: Proyectos,
          include: [
            { model: User, as: "usuarioLider", attributes: ["id", "name", "email"] },
            { model: Entidad, as: "entidad", attributes: ["id", "razonSocial"] }
          ]
        }
      ]
    });

    const resultado = asignaciones.map(a => ({
      id: a.id,
      convocatoriaId: a.convocatoriaId,
      proyectoId: a.proyectoId,
      evaluadorId: a.evaluadorId,
      estado: a.estado,
      fechaAsignacion: a.fechaAsignacion,
      fechaInicioEvaluacion: a.fechaInicioEvaluacion,
      fechaCompletada: a.fechaCompletada,

      // 📌 Evaluador
      evaluadorNombre: a.Evaluador?.name || "Sin nombre",
      evaluadorEmail: a.Evaluador?.email || null,
      evaluadorEspecialidades: a.Evaluador?.especialidades || "",

      // 📌 Proyecto
      proyecto: a.Proyecto || null,

      // 📌 Convocatoria
      convocatoria: a.Convocatorium || null,

      // 📌 Datos de la evaluación (ya están en AsignacionEvaluador)
      puntuacionTecnica: a.criterio1_viabilidad_tecnica,
      puntuacionImpacto: a.criterio2_impacto_social,
      puntuacionFinanciera: a.criterio3_sostenibilidad_financiera,
      puntuacionInnovacion: a.criterio4_innovacion,
      puntuacionCapacidad: a.criterio5_capacidad_ejecucion,

      puntuacionTotal: a.puntuacionTotal,
      puntuacionPromedio: a.puntuacionPromedio,

      observaciones: a.observacionesGenerales,
      recomendacion: a.recomendacion,
      prioridad: a.prioridad,

      evaluacionesIndividuales: [] // 📌 el frontend lo espera siempre como array
    }));

    res.json(resultado);

  } catch (error) {
    console.error("Error obteniendo asignaciones del evaluador:", error);
    res.status(500).json({ success: false, message: "Error interno" });
  }
};

// Eliminar asignación
export const eliminarAsignacion = async (req, res) => {
  try {
    const { id } = req.params;

    const asignacion = await AsignacionEvaluador.findByPk(id);

    if (!asignacion) {
      return res.status(404).json({ message: "Asignación no encontrada" });
    }

    // ❌ No permitir eliminar si tiene puntaje
    if (asignacion.puntuacionTotal && asignacion.puntuacionTotal > 0) {
      return res.status(400).json({
        message: "No puede eliminar un evaluador que ya evaluó el proyecto."
      });
    }

    await asignacion.destroy();

    res.json({ message: "Asignación eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando asignación" });
  }
};


// Obtener estadísticas generales
export const obtenerEstadisticas = async (req, res) => {
    try {
        const { convocatoriaId } = req.query;
        
        const where = {};
        if (convocatoriaId) where.convocatoriaId = convocatoriaId;

        const [
            total,
            asignadas,
            enProgreso,
            completadas,
            rechazadas,
            promedioGeneral
        ] = await Promise.all([
            AsignacionEvaluador.count({ where }),
            AsignacionEvaluador.count({ where: { ...where, estado: 'Asignado' } }),
            AsignacionEvaluador.count({ where: { ...where, estado: 'En_Progreso' } }),
            AsignacionEvaluador.count({ where: { ...where, estado: 'Completada' } }),
            AsignacionEvaluador.count({ where: { ...where, estado: 'Rechazada' } }),
            AsignacionEvaluador.findAll({
                where: { ...where, estado: 'Completada', puntuacionPromedio: { [Op.not]: null } },
                attributes: ['puntuacionPromedio']
            })
        ]);

        const promedio = promedioGeneral.length > 0 ?
            (promedioGeneral.reduce((sum, a) => sum + parseFloat(a.puntuacionPromedio), 0) / promedioGeneral.length).toFixed(2) :
            0;

        const estadisticas = {
            total,
            por_estado: {
                asignadas,
                en_progreso: enProgreso,
                completadas,
                rechazadas
            },
            promedio_calificacion: promedio,
            porcentaje_completadas: total > 0 ? ((completadas / total) * 100).toFixed(1) : 0
        };

        res.json({
            success: true,
            data: estadisticas
        });

    } catch (error) {
        console.error('Error obteniendo estadísticas:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};