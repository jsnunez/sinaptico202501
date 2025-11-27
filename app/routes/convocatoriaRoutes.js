import express from 'express';
import { 
  getConvocatorias, 
  createConvocatoria, 
  deleteConvocatoria, 
  updateConvocatoria,
  getCantidadConvocatorias,
  getCantidadEventos,
  cambiarEstadoHabilitadoConvocatoria,
  obtenerConvocatorias,
  obtenerConvocatoriaPorId,
  crearConvocatoriaCompleta,
  obtenerConvocatoriasActivas
} from '../controllers/convocatoriaController.js';

const router = express.Router();

// Rutas originales (mantenidas para compatibilidad)
router.get('/', getConvocatorias);
router.post('/', createConvocatoria);
router.delete('/:id', deleteConvocatoria);
router.put('/:id', updateConvocatoria);
router.get('/cantidadConvocatorias', getCantidadConvocatorias);
router.get('/cantidadEventos', getCantidadEventos);
router.put('/habilitar/:id', cambiarEstadoHabilitadoConvocatoria);

// Nuevas rutas con funcionalidad extendida
router.get('/lista', obtenerConvocatorias); // Obtener con paginación y filtros
router.get('/activas', obtenerConvocatoriasActivas); // Obtener convocatorias activas para público
router.get('/detalle/:id', obtenerConvocatoriaPorId); // Obtener por ID con detalles completos
router.post('/completa', crearConvocatoriaCompleta); // Crear con validaciones extendidas

export default router;