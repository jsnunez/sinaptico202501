// /api/cargos

import express from 'express';
import { getCargos, createCargo } from '../controllers/cargoController.js';

const router = express.Router();

router.get('/', getCargos);
router.post('/', createCargo);

export default router;