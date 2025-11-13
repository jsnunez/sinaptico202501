// /api/retos
import express from 'express';
import { crearServicio,getServicioById,getServicioByIdEntidad,deleteServicioById,editarServicioById} from '../controllers/servicioController.js';

const router = express.Router();
router.post('/', crearServicio);
router.get('/entidad/:id', getServicioByIdEntidad);
router.get('/:id', getServicioById);
router.delete('/:id',deleteServicioById);
router.put('/:id',editarServicioById);

export default router;