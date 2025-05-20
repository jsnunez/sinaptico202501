// /api/retos
import express from 'express';
import { getRetos, createReto, aplicarReto ,verificarAplicacion, getRetoById,updateRetoByFk,getCantidadRetos,obtenerAplicaciones } from '../controllers/retosController.js';

const router = express.Router();

router.get('/', getRetos);
router.get('/cantidad', getCantidadRetos);
router.get('/obtenerAplicaciones', obtenerAplicaciones ); // Cambié la ruta a /verificar-aplicacion/:id para que reciba el id como parámetro
router.get('/verificar-aplicacion', verificarAplicacion);
router.get('/:id', getRetoById);
router.post('/', createReto);
router.post('/aplicar', aplicarReto); 
router.put('/:fk', updateRetoByFk);


export default router;