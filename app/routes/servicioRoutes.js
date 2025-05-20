// /api/retos
import express from 'express';
import { crearServicio,getServicioByIdEntidad,deleteServicioById,editarServicioById} from '../controllers/servicioController.js';

const router = express.Router();
router.post('/', crearServicio);
router.get('/entidad/:id', getServicioByIdEntidad);
router.delete('/:id',deleteServicioById);
router.put('/:id',editarServicioById);

export default router;