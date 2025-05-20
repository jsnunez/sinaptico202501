import express from 'express';
import { getConvocatorias, createConvocatoria, deleteConvocatoria, updateConvocatoria } from '../controllers/convocatoriaController.js';

const router = express.Router();

router.get('/', getConvocatorias);
router.post('/', createConvocatoria);
router.delete('/:id',deleteConvocatoria);
router.put('/:id',updateConvocatoria);
export default router;