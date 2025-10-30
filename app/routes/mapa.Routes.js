import express from 'express';
import 
{
verCoordenadas }from '../controllers/mapa.Controller.js';

const router = express.Router();

// Ruta para ver coordenadas
router.get('/coordenadas', verCoordenadas);

export default router;