import express from 'express';
import * as aliadosProyectosController from '../controllers/aliadosProyectosAplicados.Controller.js';

const router = express.Router();

// Obtener todos los aliados
router.get('/', aliadosProyectosController.getAllAliados);
// Obtener un aliado por ID
router.get('/postulado/:id', aliadosProyectosController.getAliadoByAliadoProyectoId);

// Obtener un aliado por ID
router.get('/:id', aliadosProyectosController.getAliadoById);



export default router;