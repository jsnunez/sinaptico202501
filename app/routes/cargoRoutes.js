// /api/cargos

import express from 'express';
import { getCargos, createCargo,getCargoById } from '../controllers/cargoController.js';

const router = express.Router();

router.get('/', getCargos);
router.get('/:id', getCargoById);
router.post('/', createCargo);

export default router;