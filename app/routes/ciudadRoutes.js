// /api/ciudades

import express from 'express';
import {getCiudades, getCiudadesByDepartamentoId, getCiudadById } from '../controllers/ciudadController.js';

const router = express.Router();


// GET route to fetch cities by department
router.get('/', getCiudades);
router.get('/ciudad/:ciudadId', getCiudadById);

router.get('/:departamentoId', getCiudadesByDepartamentoId);

export default router;