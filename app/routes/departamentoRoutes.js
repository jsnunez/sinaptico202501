// /api/departamentos

import express from 'express';
import { getDepartamentos, createDepartamento,getDepartamento } from '../controllers/departamentoController.js';

const router = express.Router();

// GET route
router.get('/', getDepartamentos);
router.get('/:depId', getDepartamento);

// POST route
router.post('/', createDepartamento);

export default router;