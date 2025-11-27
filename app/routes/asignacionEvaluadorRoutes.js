import express from 'express';
import {
    crearAsignacionEvaluador,
    crearAsignacionesMultiples,
    obtenerAsignaciones,
    actualizarEvaluacion,
    obtenerAsignacionesEvaluador,
    eliminarAsignacion,
    obtenerEstadisticas
} from '../controllers/asignacionEvaluadorController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     AsignacionEvaluador:
 *       type: object
 *       required:
 *         - convocatoriaId
 *         - proyectoId
 *         - evaluadorId
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único de la asignación
 *         convocatoriaId:
 *           type: integer
 *           description: ID de la convocatoria
 *         proyectoId:
 *           type: integer
 *           description: ID del proyecto
 *         evaluadorId:
 *           type: integer
 *           description: ID del evaluador (miembro del comité)
 *         estado:
 *           type: string
 *           enum: [Asignado, En_Progreso, Completada, Rechazada]
 *           description: Estado de la evaluación
 *         criterio1_viabilidad_tecnica:
 *           type: number
 *           minimum: 0
 *           maximum: 100
 *           description: Puntuación de viabilidad técnica (0-100)
 *         criterio2_impacto_social:
 *           type: number
 *           minimum: 0
 *           maximum: 100
 *           description: Puntuación de impacto social (0-100)
 *         criterio3_sostenibilidad_financiera:
 *           type: number
 *           minimum: 0
 *           maximum: 100
 *           description: Puntuación de sostenibilidad financiera (0-100)
 *         criterio4_innovacion:
 *           type: number
 *           minimum: 0
 *           maximum: 100
 *           description: Puntuación de innovación (0-100)
 *         criterio5_capacidad_ejecucion:
 *           type: number
 *           minimum: 0
 *           maximum: 100
 *           description: Puntuación de capacidad de ejecución (0-100)
 *         puntuacionTotal:
 *           type: number
 *           description: Suma total de los 5 criterios (0-500)
 *         puntuacionPromedio:
 *           type: number
 *           description: Promedio de los 5 criterios (0-100)
 *         recomendacion:
 *           type: string
 *           enum: [Aprobado, Aprobado_Con_Condiciones, Rechazado, Requiere_Revision]
 *           description: Recomendación final del evaluador
 *         prioridad:
 *           type: string
 *           enum: [Alta, Media, Baja]
 *           description: Prioridad asignada al proyecto
 */

/**
 * @swagger
 * /api/asignacion-evaluadores:
 *   post:
 *     summary: Crear nueva asignación de evaluador
 *     tags: [AsignacionEvaluadores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - convocatoriaId
 *               - proyectoId
 *               - evaluadorId
 *             properties:
 *               convocatoriaId:
 *                 type: integer
 *               proyectoId:
 *                 type: integer
 *               evaluadorId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Asignación creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       409:
 *         description: Asignación ya existe
 */
router.post('/', crearAsignacionEvaluador);

/**
 * @swagger
 * /api/asignacion-evaluadores/multiples:
 *   post:
 *     summary: Crear múltiples asignaciones en lote
 *     tags: [AsignacionEvaluadores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - asignaciones
 *             properties:
 *               asignaciones:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     convocatoriaId:
 *                       type: integer
 *                     proyectoId:
 *                       type: integer
 *                     evaluadorId:
 *                       type: integer
 *     responses:
 *       200:
 *         description: Asignaciones procesadas
 */
router.post('/multiples', crearAsignacionesMultiples);

/**
 * @swagger
 * /api/asignacion-evaluadores:
 *   get:
 *     summary: Obtener asignaciones con filtros
 *     tags: [AsignacionEvaluadores]
 *     parameters:
 *       - in: query
 *         name: convocatoriaId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: proyectoId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: evaluadorId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *           enum: [Asignado, En_Progreso, Completada, Rechazada]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *     responses:
 *       200:
 *         description: Lista de asignaciones
 */
router.get('/', obtenerAsignaciones);

/**
 * @swagger
 * /api/asignacion-evaluadores/estadisticas:
 *   get:
 *     summary: Obtener estadísticas generales
 *     tags: [AsignacionEvaluadores]
 *     parameters:
 *       - in: query
 *         name: convocatoriaId
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estadísticas de asignaciones
 */
router.get('/estadisticas', obtenerEstadisticas);

/**
 * @swagger
 * /api/asignacion-evaluadores/evaluador/{evaluadorId}:
 *   get:
 *     summary: Obtener asignaciones de un evaluador específico
 *     tags: [AsignacionEvaluadores]
 *     parameters:
 *       - in: path
 *         name: evaluadorId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *       - in: query
 *         name: convocatoriaId
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Asignaciones del evaluador
 */
router.get('/evaluador/:id', obtenerAsignacionesEvaluador);

/**
 * @swagger
 * /api/asignacion-evaluadores/{id}/evaluacion:
 *   put:
 *     summary: Actualizar evaluación con 5 criterios
 *     tags: [AsignacionEvaluadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               criterio1_viabilidad_tecnica:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 100
 *               criterio2_impacto_social:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 100
 *               criterio3_sostenibilidad_financiera:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 100
 *               criterio4_innovacion:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 100
 *               criterio5_capacidad_ejecucion:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 100
 *               observaciones_criterio1:
 *                 type: string
 *               observaciones_criterio2:
 *                 type: string
 *               observaciones_criterio3:
 *                 type: string
 *               observaciones_criterio4:
 *                 type: string
 *               observaciones_criterio5:
 *                 type: string
 *               observacionesGenerales:
 *                 type: string
 *               recomendacion:
 *                 type: string
 *                 enum: [Aprobado, Aprobado_Con_Condiciones, Rechazado, Requiere_Revision]
 *               prioridad:
 *                 type: string
 *                 enum: [Alta, Media, Baja]
 *               tiempoEvaluacion:
 *                 type: integer
 *                 description: Tiempo en horas
 *               completarEvaluacion:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       200:
 *         description: Evaluación actualizada
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Asignación no encontrada
 */
router.put('/:id/evaluacion', actualizarEvaluacion);

/**
 * @swagger
 * /api/asignacion-evaluadores/{id}:
 *   delete:
 *     summary: Eliminar asignación
 *     tags: [AsignacionEvaluadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Asignación eliminada
 *       400:
 *         description: No se puede eliminar evaluación completada
 *       404:
 *         description: Asignación no encontrada
 */
router.delete('/:id', eliminarAsignacion);

export default router;