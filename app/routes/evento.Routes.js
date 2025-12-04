import express from 'express';
import { 
    getEventos, 
    createEvento, 
    deleteEvento, 
    updateEvento,
    getCantidadEventos,
    cambiarEstadoHabilitadoEvento,
    obtenerEventos,
    obtenerEventoPorId,
    crearEventoCompleto,
    obtenerEventosActivos
} from '../controllers/eventos.Controller.js';

const router = express.Router();

// Rutas originales (mantenidas para compatibilidad)
router.get('/', getEventos);
router.post('/', createEvento);
router.delete('/:id', deleteEvento);
router.put('/:id', updateEvento);
router.get('/cantidadEventos', getCantidadEventos);
router.put('/habilitar/:id', cambiarEstadoHabilitadoEvento);

// Nuevas rutas con funcionalidad extendida
router.get('/lista', obtenerEventos); // Obtener con paginación y filtros
router.get('/activos', obtenerEventosActivos); // Obtener eventos activos para público
router.get('/detalle/:id', obtenerEventoPorId); // Obtener por ID con detalles completos
router.post('/completo', crearEventoCompleto); // Crear con validaciones extendidas

export default router;
