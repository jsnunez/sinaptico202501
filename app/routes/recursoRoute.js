import express from 'express';
import { getRecursos, createRecurso, getRecursoById,updateRecurso,deleteRecurso } from '../controllers/recursosController.js';

const router = express.Router();

router.get('/', getRecursos);
router.get('/:id', getRecursoById);
router.post('/', createRecurso);
router.put('/:id',updateRecurso);
router.delete('/:id', deleteRecurso);

export default router;
