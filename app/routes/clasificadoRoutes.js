// /api/clasificados

import express from 'express';
import {
    createClasificado,
    getAllClasificados,
    getClasificadoById,
    updateClasificado,
    deleteClasificado,
    obtenerCantidad,
} from '../controllers/clasificadoController.js';

const router = express.Router();


router.post('/', createClasificado); 
router.get('/', getAllClasificados); 
router.get('/cantidad', obtenerCantidad);
router.get('/:id', getClasificadoById);
router.put('/:id', updateClasificado);
router.delete('/:id', deleteClasificado); 

export default router;
