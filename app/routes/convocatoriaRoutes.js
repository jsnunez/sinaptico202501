import express from 'express';
import { getConvocatorias, createConvocatoria, deleteConvocatoria, updateConvocatoria,getCantidadConvocatorias,getCantidadEventos,cambiarEstadoHabilitadoConvocatoria } from '../controllers/convocatoriaController.js';

const router = express.Router();

router.get('/', getConvocatorias);
router.post('/', createConvocatoria);
router.delete('/:id',deleteConvocatoria);
router.put('/:id',updateConvocatoria);
router.get('/cantidadConvocatorias', getCantidadConvocatorias); // Descomentar si se necesita esta ruta
router.get('/cantidadEventos', getCantidadEventos); // Descomentar si se necesita esta ruta
router.put('/habilitar/:id', cambiarEstadoHabilitadoConvocatoria);
export default router;