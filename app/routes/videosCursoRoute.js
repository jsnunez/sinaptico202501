import express from 'express';
import {getVideosByCursoId,getCantidadVideosByCursoId} from '../controllers/videosCursoController.js';
import { getVideoIdsByCursoId } from '../controllers/videosCursoController.js';

const router = express.Router();

// Ruta para obtener videos por ID de curso
router.get('/:id', getVideosByCursoId);
router.get('/cantidad/:id', getCantidadVideosByCursoId);
// Ruta para obtener los IDs de videos por ID de curso
router.get('/ids/:id', getVideoIdsByCursoId);
export default router;