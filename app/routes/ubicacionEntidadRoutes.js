import express from 'express';
import {
  obtenerTodasLasUbicaciones,
  obtenerUbicacionesPorEntidad,
  crearUbicacion,
  actualizarUbicacion,
  eliminarUbicacion,
  obtenerEntidadesParaMapa
} from '../controllers/ubicacionEntidadController.js';

const router = express.Router();

// Rutas para ubicaciones de entidades
router.get('/', obtenerTodasLasUbicaciones);
router.get('/entidad/:entidadId', obtenerUbicacionesPorEntidad);
router.get('/mapa/entidades', obtenerEntidadesParaMapa);
router.post('/', crearUbicacion);
router.put('/:id', actualizarUbicacion);
router.delete('/:id', eliminarUbicacion);

export default router;