import express from 'express';
import * as aliadosProyectosController from '../controllers/aliadosProyectos.Controller.js';

const router = express.Router();

// Obtener todos los aliados
router.get('/', aliadosProyectosController.getAllAliados);

// Obtener un aliado por ID
router.get('/:id', aliadosProyectosController.getAliadoById);

// Crear un nuevo aliado
router.post('/', aliadosProyectosController.createAliado);

// Actualizar un aliado
router.put('/:id', aliadosProyectosController.updateAliado);

// Eliminar un aliado
router.delete('/:id', aliadosProyectosController.deleteAliado);

export default router;