import express from 'express';
import { getTipoConvocatorias } from '../controllers/convocatoriaController.js';

const router = express.Router();

router.get('/', getTipoConvocatorias);
export default router;