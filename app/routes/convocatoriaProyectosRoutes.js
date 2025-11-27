import express from 'express';
import {
    getConvocatoriaProyectos,
    getConvocatoriasByProyecto,
    getProyectosByConvocatoria,
    createConvocatoriaProyecto,
    updateEstadoEvaluacion,
    deleteConvocatoriaProyecto,
    getEstadisticasConvocatoria,
    verificarPostulacionExistente,
    asignarEvaluadoresMultiples,
    guardarEvaluacionIndividual,finalizar
} from '../controllers/convocatoriaProyectosController.js';

const router = express.Router();

// GET /api/convocatoria-proyectos - Obtener todas las aplicaciones
router.get('/', getConvocatoriaProyectos);

// GET /api/convocatoria-proyectos/verificar/:userId/:convocatoriaId - Verificar si existe postulación
router.get('/verificar/:userId/:convocatoriaId', verificarPostulacionExistente);

// GET /api/convocatoria-proyectos/proyecto/:proyectoId - Obtener convocatorias aplicadas por un proyecto
router.get('/proyecto/:proyectoId', getConvocatoriasByProyecto);

// GET /api/convocatoria-proyectos/convocatoria/:convocatoriaId - Obtener proyectos aplicados a una convocatoria
router.get('/convocatoria/:convocatoriaId', getProyectosByConvocatoria);

// GET /api/convocatoria-proyectos/estadisticas/:convocatoriaId - Obtener estadísticas de una convocatoria
router.get('/estadisticas/:convocatoriaId', getEstadisticasConvocatoria);

// POST /api/convocatoria-proyectos - Crear nueva aplicación de proyecto a convocatoria
router.post('/', createConvocatoriaProyecto);

// POST /api/convocatoria-proyectos/asignar-evaluadores-multiples - Asignar múltiples evaluadores a múltiples proyectos
router.post('/asignar-evaluadores-multiples', asignarEvaluadoresMultiples);

// PUT /api/convocatoria-proyectos/:id/evaluacion - Actualizar estado de evaluación
router.put('/:id/evaluacion', updateEstadoEvaluacion);
router.put('/:id/finalizar', finalizar);
// POST /api/convocatoria-proyectos/:id/evaluacion-individual - Guardar evaluación individual
router.post('/:id/evaluacion-individual', guardarEvaluacionIndividual);

// DELETE /api/convocatoria-proyectos/:id - Eliminar aplicación
router.delete('/:id', deleteConvocatoriaProyecto);

export default router;