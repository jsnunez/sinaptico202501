import express from 'express';
import {
  getAllTiposActor,
  getClasesActor,
  getTipoActorById,
  createTipoActor,
  updateTipoActor,
  deactivateTipoActor,
  getEstadisticasTiposActor
} from '../controllers/tipoActorController.js';
import { methods as authorization } from "../middlewares/authorization.js";

const router = express.Router();

// Rutas públicas
router.get('/clases', getClasesActor); // Para selects en formularios
router.get('/estadisticas', getEstadisticasTiposActor);
router.get('/', getAllTiposActor);
router.get('/:id', getTipoActorById);

// Rutas protegidas (solo admin)
router.post('/', authorization.soloAdmin, createTipoActor);
router.put('/:id', authorization.soloAdmin, updateTipoActor);
router.delete('/:id', authorization.soloAdmin, deactivateTipoActor);

export default router;
